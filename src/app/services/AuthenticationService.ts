import {Injectable} from "@angular/core";
import User from "../../models/User";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import ToastService, {ToastType} from "./ToastService";
import AuthenticationController, {WebAuthnLoginResponse} from "../controllers/AuthenticationController";
import AuthLoginDetails from "../../models/dtos/AuthLoginDetails";
import * as WebAuthn from "@github/webauthn-json";
import {CredentialCreationOptionsJSON, PublicKeyCredentialWithAttestationJSON} from "@github/webauthn-json";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import UserController from "../controllers/UserController";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class AuthenticationService {
  private component_toast_subject: String = "Authentication";

  private user: User | null = null;

  private user_subj: Subject<User | null> = new Subject<User | null>();
  private userObserver: Observable<User | null> = this.user_subj.asObservable();

  private token: String | null = null;
  private token_subj: Subject<String | null> = new Subject<String | null>();
  private tokenObserver: Observable<String | null> = this.token_subj.asObservable();

  constructor(private toast_service: ToastService, private auth_controller: AuthenticationController, private router: Router, private jwtHelper: JwtHelperService, private user_controller: UserController) {
    this.retrieveToken();
  }

  // ! Methods
  // * Getters
  public getUser(): User | null {
    return this.user;
  }

  public getUserObserver(): Observable<User | null> {
    return this.userObserver;
  }

  public getToken(): String | null {
    return this.token;
  }

  public getTokenObserver(): Observable<String | null> {
    return this.tokenObserver;
  }

  // * Setters
  private setUser(user: User | null) {
    this.user = user;
    this.user_subj.next(user);
  }

  private setToken(token: String | null) {
    if (token) {
      localStorage.setItem('token', token.toString());
    } else {
      localStorage.removeItem('token');
    }
    this.token = token;
    this.token_subj.next(token);
  }

  // ! Business Logic

  // * Auth-Type Agnostic Methods

  public async retrieveToken(): Promise<boolean> {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.toast_service.setMessage("Retrieving user information", ToastType.INFO);
      if (await this.retrieveUserInformation(token)) {
        this.setToken(token);
        if (this.router.url.includes('login')) {
          this.router.navigate(['home']);
        }
      } else {
        this.setToken(null);
        localStorage.removeItem('token');
      }
    }

    return this.getToken() != null;
  }

  public logout(): void {
    this.setUser(null);
    this.setToken(null);

    this.router.navigate(['/login']).then(() => {
      this.toast_service.setMessage("Logged out successfully", ToastType.SUCCESS);
    });
  }

  public async retrieveUserInformation(token: string): Promise<boolean> {
    let user_info: User | null = await new Promise<User | null>(
      (resolve, reject) => {
        this.user_controller.getUserById(this.jwtHelper.decodeToken(token).id, token).subscribe({
          next: (res: Object) => {
            resolve(new User(res as User));
          }, error: (err: HttpErrorResponse) => {
            resolve(null);
          }
        });
      }
    );

    this.setUser(user_info);

    return user_info !== null;
  }

  // * Password-Based Methods
  public async authenticatePassword(credentials: AuthLoginDetails): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth_controller.authenticatePassword(credentials).subscribe({
        next: async (res) => {
          this.setToken(res.toString());

          if (!await this.retrieveUserInformation(res.toString())) {
            this.setToken(null);
            this.setUser(null);
            this.toast_service.setMessage("Could not retrieve the user's information", ToastType.DANGER)
            resolve(false);
          } else {
            this.toast_service.setMessage("Logged in successfully", ToastType.SUCCESS);
            resolve(true);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.ServiceUnavailable) {
            this.toast_service.setMessage("Service unavailable", ToastType.WARNING);
          } else {
            this.toast_service.setMessage("Invalid Credentials", ToastType.WARNING);
          }
          resolve(false);
        }
      });
    });
  }

  // Change Password
  public async changePassword(old_password: String, new_password: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let user_id: String | undefined = this.user?.getIdentifier();
      if (this.user && this.token && user_id) {

        this.auth_controller.changePassword(user_id, old_password, new_password, this.token).subscribe({
          next: async (res) => {
            this.setToken(null);
            this.setUser(null);

            this.router.navigate(['/login']).then((res) => {
              this.toast_service.setMessage("Password changed successfully", ToastType.SUCCESS)
              resolve(true);
            });
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.ServiceUnavailable) {
              this.toast_service.setMessage("Service unavailable", ToastType.WARNING);
            } else {
              this.toast_service.setMessage("Could not change password", ToastType.WARNING);
            }
            resolve(false);
          }

        });
      } else {
        console.log("Could not perform operation, user is not logged in.");
        resolve(false);
      }
    });
  }

  // * WebAuthn-Based Methods

  // Start WebAuthn Registration
  public startAuthnRegistration(credentials: AuthLoginDetails): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.auth_controller.startAuthnRegistration(credentials).subscribe({
        next: async (res: Object) => {
          try {
            let public_key: PublicKeyCredentialWithAttestationJSON = await WebAuthn.create(res as CredentialCreationOptionsJSON);

            credentials.setPublicKey(JSON.stringify(public_key));

            resolve(await this.endAuthnRegistration(credentials));
          } catch (e) {
            this.toast_service.setMessage("Could not register the new Passkeyc", ToastType.DANGER);
          }
        },
        error: (res) => {
          this.toast_service.setMessage("Invalid Credentials", ToastType.WARNING);
        }
      });
    });
  }

  // End WebAuthn Registration
  public endAuthnRegistration(credentials: AuthLoginDetails): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.auth_controller.endAuthnRegistration(credentials).subscribe({
        next: (res) => {
          this.setToken(res.toString());
          resolve(true);
        },
        error: (res) => {
          this.toast_service.setMessage("Invalid Credentials", ToastType.WARNING);
          resolve(false);
        }
      });
    });
  }

  // Start WebAuthn Login
  public startAuthnLogin(credentials: AuthLoginDetails): Promise<boolean> {
    return new Promise(async (resolve, reject): Promise<void> => {
      this.auth_controller.startAuthnLogin(credentials).subscribe({
        next: async (res: WebAuthnLoginResponse) => {
          try {
            let public_key: WebAuthn.PublicKeyCredentialWithAssertionJSON = await WebAuthn.get(res);
            credentials.setPublicKey(JSON.stringify(public_key));
          } catch (e) {
            this.toast_service.setMessage("Could not authenticate using Passkeys", ToastType.DANGER);
          }

          resolve(await this.endAuthnLogin(credentials));
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == HttpStatusCode.NotFound) {
            this.toast_service.setMessage("You don't have a Passkey registered", ToastType.WARNING);
          } else if (err.status == HttpStatusCode.ServiceUnavailable) {
            this.toast_service.setMessage("Service Unavailable", ToastType.DANGER);
          } else {
            this.toast_service.setMessage("Could not authenticate using Passkeys", ToastType.DANGER);
          }
          resolve(false);
        }
      });
    })
  }

  // End WebAuthn Login
  public endAuthnLogin(credentials: AuthLoginDetails): Promise<boolean> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        this.auth_controller.endAuthnLogin(credentials).subscribe({
          next: async (token: String) => {
            if (!await this.retrieveUserInformation(token.toString())) {
              this.setToken(null);
              this.setUser(null);
              this.toast_service.setMessage("Could not retrieve the user's information", ToastType.DANGER);
              resolve(false);
            } else {
              this.setToken(token);
              this.toast_service.setMessage("Logged in successfully", ToastType.SUCCESS);
              resolve(true);
            }
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == HttpStatusCode.ServiceUnavailable) {
              this.toast_service.setMessage("Service Unavailable", ToastType.DANGER);
            } else {
              this.toast_service.setMessage("Could not authenticate using Passkeys", ToastType.DANGER);
            }
            resolve(false);
          }
        });
      }
    );
  }
}
