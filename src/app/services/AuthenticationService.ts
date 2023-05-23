import {Injectable} from "@angular/core";
import User from "../models/User";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastComponent, ToastType} from "../components/toast/toast.component";
import AuthenticationController, {WebAuthnLoginResponse} from "../controllers/AuthenticationController";
import AuthLoginDetails from "../models/dtos/AuthLoginDetails";
import * as WebAuthn from "@github/webauthn-json";

// Define the service as injectable and include the AuthenticationController provider
@Injectable()
export default class AuthenticationService {
  private current_user: User | undefined;
  private token: String | undefined;

  constructor(private auth_controller: AuthenticationController, private router: Router, private jwtHelper: JwtHelperService, public toast: ToastComponent) {
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

  // * Setters
  private setCurrentUser(user: User | undefined) {
    this.current_user = user;
  }

  private setToken(token: String) {
    this.token = token;
  }

  // ! Business Logic
  // * Auth-Type Agnostic Methods
  public logout(): void {
    localStorage.removeItem('token');

    this.setCurrentUser(undefined);

    this.router.navigate(['/']).then(() => {
      this.toast.setMessage('Logged out successfully!', ToastType.SUCCESS);
    });
  }

  // * Password-Based Methods
  public authenticatePassword(credentials: AuthLoginDetails): void {
    this.auth_controller.authenticatePassword(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.toString());

        this.setCurrentUser(this.jwtHelper.decodeToken(res.toString()).user);

        this.router.navigate(['/']).then((res) => {
          this.toast.setMessage('Logged in Successfully!', ToastType.SUCCESS);
        });
      },
      error: () => {
        this.toast.setMessage('Invalid credentials!', ToastType.DANGER)
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
        this.toast.setMessage('Invalid credentials!', ToastType.DANGER)
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
        this.toast.setMessage('Invalid credentials!', ToastType.DANGER)
      }
    });
  }

  // Start WebAuthn Login
  public startAuthnLogin(credentials: AuthLoginDetails): void {
    this.auth_controller.startAuthnLogin(credentials).subscribe({
      next: async (res: WebAuthnLoginResponse) => {
        let public_key: WebAuthn.PublicKeyCredentialWithAssertionJSON = await WebAuthn.get(res);

        credentials.setPublicKey(public_key);

        this.endAuthnLogin(credentials);
        this.toast.setMessage('Login successfully!', ToastType.DANGER)
      },
      error: (res) => {
        console.log(res);
        this.toast.setMessage('Invalid credentials!', ToastType.DANGER)
      }
    });
  }

  // End WebAuthn Login
  public endAuthnLogin(credentials: AuthLoginDetails): void {
    this.auth_controller.endAuthnLogin(credentials).subscribe({
      next: (token: String) => {
        this.setToken(token);

        // TODO: Implement user retrival
        //this.jwtHelper.decodeToken(res.toString()).id => Gets the Id of the user that the token belongs to.
      },
      error: (res) => {
        console.log(res);
        this.toast.setMessage('Invalid credentials!', ToastType.DANGER)
      }
    });
  }
}
