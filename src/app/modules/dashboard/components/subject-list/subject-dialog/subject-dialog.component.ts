import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import ToastService, {ToastType} from "../../../../../services/ToastService";
import {MatIconModule} from "@angular/material/icon";
import {Subject} from "../../../../../../models/Subject";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss'],
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
export class SubjectDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISubjectDialogData,
    protected dialogRef: MatDialogRef<SubjectDialogComponent>,
    protected toast_service: ToastService,
  ) {
  }

  protected hide_sensitive_data: boolean = true;
  protected subject_details: FormGroup = new FormGroup({
    name: new FormControl(this.data.subject_instance?.getName(), [Validators.required]),
  });

  protected submitSubjectCreation(): void {
    if (
      this.subject_details.invalid ||
      this.subject_details.controls['name'].value.length == 0
    ) {
      this.toast_service.setMessage("Missing information for user creation", ToastType.DANGER);
      return;
    }

    let subject_instance: Subject = new Subject(undefined);
    subject_instance.setName(this.subject_details.controls['name'].value);

    this.dialogRef.close({
      subject_instance: subject_instance
    });
  }

  protected submitUserEdit(): void {
    if (
      this.subject_details.invalid ||
      this.subject_details.controls['name'].value.length == 0
    ) {
      this.toast_service.setMessage("Missing information for user creation", ToastType.DANGER);
      return;
    }
    let subject_instance: Subject = new Subject(this.data.subject_instance);
    subject_instance.setName(this.subject_details.controls['name'].value);

    this.dialogRef.close({
      subject_instance
    });
  }

  protected cancelResponse() {
    this.dialogRef.close(null);
  }

  protected readonly ESubjectDialogModes = ESubjectDialogModes;
}

interface ISubjectDialogData {
  DIALOG_MODE: ESubjectDialogModes,
  subject_instance: Subject | undefined
}

export interface ISubjectDialogResult {
  subject_instance: Subject | undefined
}

export enum ESubjectDialogModes {
  CREATE,
  EDIT
}
