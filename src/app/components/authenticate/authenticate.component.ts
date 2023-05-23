import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {ErrorStateMatcher} from "@angular/material/core";
import AuthenticationService from "../../services/AuthenticationService";
import AuthLoginDetails from "../../models/dtos/AuthLoginDetails";

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

  constructor(private auth_service: AuthenticationService) {
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

  protected submitEmail(): void {
    if (this.email.valid) {
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

  protected submitWebAuthn(): void {
    this.auth_type = AuthStagesEnum.WEBAUTHNLOGIN;
    let authLoginDetails = new AuthLoginDetails();
    authLoginDetails.setUsername(String(this.email.value));

    this.auth_service.startAuthnLogin(authLoginDetails);
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
