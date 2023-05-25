import {Injectable} from "@angular/core";
import User from "../models/User";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastComponent, ToastType} from "../components/toast/toast.component";
import AuthenticationController, {WebAuthnLoginResponse} from "../controllers/AuthenticationController";
import AuthLoginDetails from "../models/dtos/AuthLoginDetails";
import * as WebAuthn from "@github/webauthn-json";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import ToastService from "./ToastService";

// Define the service as injectable and include the AuthenticationController provider
@Injectable()
export default class AuthenticationService {
  private component_toast_subject: String = "Authentication";

  private current_user: User | undefined;
  private token: String | undefined;
  private auth_key: String | undefined;

  constructor(private toast_service: ToastService, private auth_controller: AuthenticationController, private router: Router, private jwtHelper: JwtHelperService, public toast: ToastComponent) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }
  }

  // ! Methods
  // * Getters
  public get getCurrentUser(): User | undefined {
    return this.current_user;
  }

  public get getToken(): String | undefined {
    return this.token;
  }

  public get getAuthKey(): String | undefined {
    return this.auth_key;
  }

  // * Setters
  private setCurrentUser(user: User | undefined) {
    this.current_user = user;
  }

  private setToken(token: String) {
    this.token = token;
    this.setAuthKey('Bearer ' + token);
  }

  private setAuthKey(auth_key: String) {
    this.auth_key = auth_key;
  }

  // ! Business Logic
  // * Auth-Type Agnostic Methods
  public logout(): void {
    localStorage.removeItem('token');

    this.setCurrentUser(undefined);

    this.router.navigate(['/login']).then(() => {
      this.toast_service.setMessage(this.component_toast_subject, 'Logged out successfully!', ToastType.SUCCESS)
    });
  }

  // * Password-Based Methods
  public authenticatePassword(credentials: AuthLoginDetails): void {
    this.auth_controller.authenticatePassword(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.toString());

        this.setCurrentUser(this.jwtHelper.decodeToken(res.toString()).user);

        this.router.navigate(['/']).then((res) => {
          this.toast_service.setMessage(this.component_toast_subject, 'Logged in successfully!', ToastType.SUCCESS)
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.ServiceUnavailable) {
          this.toast_service.setMessage(this.component_toast_subject, 'Invalid Credentials!', ToastType.WARNING);
        } else {
          this.toast_service.setMessage(this.component_toast_subject, 'Invalid Credentials!', ToastType.WARNING);
        }
      }
    });
  }

  // * WebAuthn-Based Methods

  // Start WebAuthn Registration
  public startAuthnRegistration(credentials: AuthLoginDetails): void {
    this.auth_controller.startAuthnRegistration(credentials).subscribe({
      next: async (res: String) => {

      },
      error: (res) => {
        console.log(res);
        this.toast_service.setMessage(this.component_toast_subject, 'Invalid Credentials!', ToastType.WARNING);
      }
    });
  }

  // End WebAuthn Registration
  public endAuthnRegistration(credentials: AuthLoginDetails): void {
    this.auth_controller.endAuthnRegistration(credentials).subscribe({
      next: (res) => {
        this.setToken(res.toString());
      },
      error: (res) => {
        console.log(res);
        this.toast_service.setMessage(this.component_toast_subject, 'Invalid Credentials!', ToastType.WARNING);
      }
    });
  }

  // Start WebAuthn Login
  public startAuthnLogin(credentials: AuthLoginDetails): Promise<boolean> {
    return new Promise(async (resolve, reject): Promise<void> => {
      this.auth_controller.startAuthnLogin(credentials).subscribe({
        next: async (res: WebAuthnLoginResponse) => {
          let public_key: WebAuthn.PublicKeyCredentialWithAssertionJSON = await WebAuthn.get(res);

          credentials.setPublicKey(public_key);

          resolve(await this.endAuthnLogin(credentials));
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == HttpStatusCode.NotFound) {
            this.toast_service.setMessage(this.component_toast_subject, "You don't have a Passkey registered!", ToastType.WARNING);
          } else if (err.status == HttpStatusCode.ServiceUnavailable) {
            this.toast_service.setMessage(this.component_toast_subject, "Service Unavailable.", ToastType.DANGER);
          } else {
            this.toast_service.setMessage(this.component_toast_subject, "Could not authenticate using Passkeys.", ToastType.DANGER);
          }
          reject(false);
        }
      });
    })
  }

  // End WebAuthn Login
  public endAuthnLogin(credentials: AuthLoginDetails): Promise<boolean> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        this.auth_controller.endAuthnLogin(credentials).subscribe({
          next: (token: String) => {
            this.setToken(token);

            // TODO: Implement user retrival
            this.toast_service.setMessage(this.component_toast_subject, 'Logged in successfully!', ToastType.SUCCESS);
            // this.jwtHelper.decodeToken(res.toString()).id => Gets the Id of the user that the token belongs to.
            resolve(true);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == HttpStatusCode.ServiceUnavailable) {
              this.toast_service.setMessage(this.component_toast_subject, "Service Unavailable.", ToastType.DANGER);
            } else {
              this.toast_service.setMessage(this.component_toast_subject, "Could not authenticate using Passkeys.", ToastType.DANGER);
            }
            reject(false);
          }
        });
      }
    );
  }
}
