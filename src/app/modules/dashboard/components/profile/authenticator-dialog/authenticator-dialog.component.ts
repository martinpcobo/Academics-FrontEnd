import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './authenticator-dialog.component.html',
  styleUrls: ['./authenticator-dialog.component.css'],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class AuthenticatorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AuthenticatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthenticatorDialogData,
  ) {
  }

  protected new_name: FormControl = new FormControl('', [Validators.required, Validators.maxLength(32)]);

  protected submitResponse(value: any): void {
    this.dialogRef.close(value);
  }
}

interface AuthenticatorDialogData {
  title: String
}
