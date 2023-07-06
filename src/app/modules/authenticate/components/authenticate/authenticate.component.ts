import {FormControl, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import AuthenticationService from "../../../../services/AuthenticationService";
import AuthLoginDetails from "../../../../../models/dtos/AuthLoginDetails";
import ToastService from "../../../../services/ToastService";
import UserService from "../../../../services/UserService";
import AuthenticatorService from "../../../../services/AuthenticatorService";
import {Router} from "@angular/router";
import ThemeService, {EThemeOptions} from "../../../../services/ThemeService";


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent {
  protected auth_type: AuthStagesEnum = AuthStagesEnum.EMAIL;
  protected email: FormControl<string | null> = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@ucema\\.edu\\.ar$")]);
  protected password: FormControl<string | null> = new FormControl('', [Validators.required]);
  protected hide_password: boolean = true;
  protected readonly AuthStagesEnum = AuthStagesEnum;
  protected readonly window = window;
  protected readonly EThemeOptions = EThemeOptions;

  constructor(
    private auth_service: AuthenticationService,
    protected authenticator_service: AuthenticatorService,
    private user_service: UserService,
    private toast_service: ToastService,
    private router: Router,
    protected theme_service: ThemeService
  ) {
  }

  protected getErrorMessage(element: FormControl) {
    if (element.hasError('required')) {
      return 'Required';
    }
    if (element.hasError('email') || element.hasError('pattern')) {
      return 'Not a valid email';
    }

    return null;
  }

  protected async submitEmail(): Promise<void> {
    if (this.email.valid && this.email.value) {
      if (await this.authenticator_service.userHasAuthenticators(this.email.value)) {
        this.auth_type = AuthStagesEnum.WEBAUTHNLOGIN;
        await this.submitWebAuthn();
      } else {
        this.auth_type = AuthStagesEnum.CREDENTIALS;
      }
    } else {
      this.email.markAsTouched();
    }
  }

  protected async submitPassword(): Promise<void> {
    if (this.password.valid) {
      let authLoginDetails = new AuthLoginDetails();
      authLoginDetails.setUsername(String(this.email.value));
      authLoginDetails.setPassword(String(this.password.value));

      if (await this.auth_service.authenticatePassword(authLoginDetails)) {

        this.router.navigate(['/']);
      } else {
        this.auth_type = AuthStagesEnum.CREDENTIALS;
      }
    } else {
      this.password.markAsTouched();
    }
  }

  protected async submitWebAuthn(): Promise<void> {
    this.auth_type = AuthStagesEnum.WEBAUTHNLOGIN;
    let authLoginDetails = new AuthLoginDetails();
    authLoginDetails.setUsername(String(this.email.value));

    if (await this.auth_service.startAuthnLogin(authLoginDetails)) {
      await this.router.navigate(['/']);
    } else {
      this.auth_type = AuthStagesEnum.CREDENTIALS;
    }
  }
}

enum AuthStagesEnum {
  EMAIL,
  CREDENTIALS,
  WEBAUTHNLOGIN,
  FORGOTPASSWORD,
}
