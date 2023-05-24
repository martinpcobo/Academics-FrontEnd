import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {ErrorStateMatcher} from "@angular/material/core";
import AuthenticationService from "../../services/AuthenticationService";
import AuthLoginDetails from "../../models/dtos/AuthLoginDetails";
import {ToastType} from "../toast/toast.component";
import ToastService from "../../services/ToastService";
import UserService from "../../services/UserService";
import AuthenticatorService from "../../services/AuthenticatorService";


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
  providers: [AuthenticationService]
})
export class AuthenticateComponent {
  error_matcher = new MyErrorStateMatcher();
  auth_type: AuthStagesEnum = AuthStagesEnum.EMAIL;
  email: FormControl<string | null> = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl<string | null> = new FormControl('', [Validators.required]);
  hide_password: boolean = true;


  constructor(
    private auth_service: AuthenticationService,
    private authenticator_service: AuthenticatorService,
    private user_service: UserService,
    private toast_service: ToastService) {
  }

  protected getErrorMessage(element: FormControl) {
    if (element.hasError('required')) {
      return 'Required';
    }
    if (element.hasError('email')) {
      return 'Not a valid email';
    }

    return null;
  }

  protected async submitEmail(): Promise<void> {
    if (this.email.valid && this.email.value) {
      let credentials: AuthLoginDetails = new AuthLoginDetails();
      credentials.setUsername(this.email.value);

      let user_id: null | String = await this.user_service.getUserIdFromVerifiedEmail(credentials);
      if (user_id) {
        if (await this.authenticator_service.authenticatorExists(user_id)) {
          this.auth_type = AuthStagesEnum.WEBAUTHNLOGIN;
          await this.submitWebAuthn();
          return;
        }
      }
      this.auth_type = AuthStagesEnum.CREDENTIALS;
    } else {
      this.email.markAsTouched();
    }
  }

  protected submitPassword(): void {
    if (this.password.valid) {
      let authLoginDetails = new AuthLoginDetails();
      authLoginDetails.setUsername(String(this.email.value));
      authLoginDetails.setPassword(String(this.password.value));

      this.auth_service.authenticatePassword(authLoginDetails)

    } else {
      this.password.markAsTouched();
    }
  }

  protected async submitWebAuthn(): Promise<void> {
    this.auth_type = AuthStagesEnum.WEBAUTHNLOGIN;
    let authLoginDetails = new AuthLoginDetails();
    authLoginDetails.setUsername(String(this.email.value));

    try {
      if (await this.auth_service.startAuthnLogin(authLoginDetails)) {
        this.toast_service.setMessage('Authentication', 'Login Successful!', ToastType.SUCCESS);
      } else {
        this.auth_type = AuthStagesEnum.EMAIL;
        console.log("Could not authenticate using Passkeys!");
        this.toast_service.setMessage('Authentication', 'Could not authenticate using Passkeys!', ToastType.WARNING);
      }
    } catch (err: any) {
      console.log(err);
      this.auth_type = AuthStagesEnum.EMAIL;
      this.toast_service.setMessage('Authentication', 'Could not authenticate using Passkeys!', ToastType.WARNING);
    }
  }

  protected readonly AuthStagesEnum = AuthStagesEnum;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

enum AuthStagesEnum {
  EMAIL,
  CREDENTIALS,
  WEBAUTHNLOGIN,
  FORGOTPASSWORD,
}
