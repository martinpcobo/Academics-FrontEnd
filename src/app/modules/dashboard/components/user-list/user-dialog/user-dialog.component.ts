import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import User from "../../../../../../models/User";
import {NgIf} from "@angular/common";
import ToastService, {ToastType} from "../../../../../services/ToastService";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule
  ],
  standalone: true
})
export class UserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUserDialogData,
    protected dialogRef: MatDialogRef<UserDialogComponent>,
    protected toast_service: ToastService,
  ) {
  }

  protected hide_sensitive_data: boolean = true;
  protected user_details: FormGroup = new FormGroup({
    first_name: new FormControl(this.data.user_instance?.getFirstName(), [Validators.required]),
    last_name: new FormControl(this.data.user_instance?.getLastName(), [Validators.required]),
    email: new FormControl(this.data.user_instance?.getVerifiedEmail(), [Validators.required, Validators.email]),
    password: new FormControl(Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$").map(function (x) {
      return x[Math.floor(Math.random() * x.length)]
    }).join(''), [Validators.required]),
  });

  protected submitUserCreation(): void {
    if (
      this.user_details.invalid ||
      this.user_details.controls['first_name'].value.length == 0 ||
      this.user_details.controls['last_name'].value.length == 0 ||
      this.user_details.controls['email'].value.length == 0
    ) {
      this.toast_service.setMessage("Missing information for user creation", ToastType.DANGER);
      return;
    }

    let user_instance: User = new User(undefined);
    user_instance.setFirstName(this.user_details.controls['first_name'].value);
    user_instance.setLastName(this.user_details.controls['last_name'].value);
    user_instance.setVerifiedEmail(this.user_details.controls['email'].value);

    this.dialogRef.close({
      user_instance: user_instance,
      password: this.user_details.controls['password'].value
    });
  }

  protected submitUserEdit(): void {
    if (
      this.user_details.invalid ||
      this.user_details.controls['first_name'].value.length == 0 ||
      this.user_details.controls['last_name'].value.length == 0 ||
      this.user_details.controls['email'].value.length == 0
    ) {
      this.toast_service.setMessage("Missing information for user creation", ToastType.DANGER);
      return;
    }

    let user_instance: User = new User(this.data.user_instance);
    user_instance.setFirstName(this.user_details.controls['first_name'].value);
    user_instance.setLastName(this.user_details.controls['last_name'].value);
    user_instance.setVerifiedEmail(this.user_details.controls['email'].value);

    this.dialogRef.close({
      user_instance: user_instance
    });
  }

  protected cancelResponse() {
    this.dialogRef.close(null);
  }

  protected readonly EUserDialogMode = EUserDialogMode;
}

interface IUserDialogData {
  DIALOG_MODE: EUserDialogMode,
  user_instance: User | undefined
}

export enum EUserDialogMode {
  CREATE,
  EDIT
}
