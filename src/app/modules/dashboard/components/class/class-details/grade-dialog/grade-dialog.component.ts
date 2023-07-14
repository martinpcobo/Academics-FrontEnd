import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgFor, NgIf} from "@angular/common";
import ToastService, {ToastType} from "../../../../../../services/ToastService";
import {MatIconModule} from "@angular/material/icon";
import {Class} from "../../../../../../../models/Class";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {map, Observable, startWith} from "rxjs";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Professor} from "../../../../../../../models/Professor";
import ProfessorService from "../../../../services/ProfessorService";
import {Student} from "../../../../../../../models/Student";
import StudentService from "../../../../services/StudentService";
import {Subject} from "../../../../../../../models/Subject";
import SubjectService from "../../../../services/SubjectService";
import {Grade} from "../../../../../../../models/Grade";
import {Course} from "../../../../../../../models/Course";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './grade-dialog.component.html',
  styleUrls: ['./grade-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  standalone: true,
})

export class GradeDialogComponent implements OnInit {
  // ! Attributes
  protected grade_details: FormGroup = new FormGroup({
    student: new FormControl(this.data.grade_instance?.getStudent(), [Validators.required]),
    value: new FormControl(this.data.grade_instance?.getValue(), [Validators.required]),
  });

  protected student_list: Student[] = [];
  protected filtered_students: Observable<Student[]> = new Observable<Student[]>();
  protected selected_student: Student | undefined = undefined;

  protected separatorKeysCodes: number[] = [ENTER, COMMA];

  // ! Constructor
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IGradeDialogData,
    protected dialogRef: MatDialogRef<GradeDialogComponent>,
    protected toast_service: ToastService,
    protected student_service: StudentService,
    protected subject_service: SubjectService,
  ) {
  }

  // ! Business Logic

  // * Dialog Methods
  async ngOnInit(): Promise<void> {
    this.student_list = await this.student_service.getAllStudents();

    this.selected_student = this.data.grade_instance?.getStudent();

    this.filtered_students = this.grade_details.controls['student'].valueChanges.pipe(
      startWith(this.data.grade_instance?.getStudent()),
      map((value: String | null) => {
          if (value) {
            return this.student_list.filter((student_ind: Student) => {
              return student_ind.getUser()?.getName()?.includes(value.toString()) && this.selected_student?.getIdentifier() != student_ind.getIdentifier();
            });
          } else {
            return [];
          }
        }
      )
    );
  }

  protected submitGradeCreation(): void {
    if (
      this.grade_details.invalid ||
      this.grade_details.controls['student'].value.length == 0 ||
      this.grade_details.controls['value'].value.length == 0 ||
      this.selected_student == undefined
    ) {
      this.toast_service.setMessage("Missing information for grade creation", ToastType.DANGER);
      return;
    }

    let grade_instance: Grade = new Grade(this.data.grade_instance);
    grade_instance.setValue(this.grade_details.controls['value'].value);

    let student_instance: Student = new Student(this.selected_student);
    student_instance.setCourses([]);
    student_instance.setGrades([]);
    grade_instance.setStudent(student_instance);

    let course_instance: Class = new Class(this.data.course_instance);
    course_instance.setProfessors([]);
    course_instance.setStudents([]);
    course_instance.setGrades([]);

    grade_instance.setClass(course_instance);

    this.dialogRef.close({
      grade_instance
    });
  }

  protected submitGradeEdit(): void {
    if (
      this.grade_details.invalid ||
      this.grade_details.controls['student'].value.length == 0 ||
      this.grade_details.controls['value'].value.length == 0 ||
      this.selected_student == undefined
    ) {
      this.toast_service.setMessage("Missing information for grade creation", ToastType.DANGER);
      return;
    }

    let grade_instance: Grade = new Grade(this.data.grade_instance);
    grade_instance.setValue(this.grade_details.controls['value'].value);
    grade_instance.setStudent(this.selected_student);

    let course_instance: Class = new Class(this.data.course_instance);
    course_instance.setProfessors([]);
    course_instance.setStudents([]);
    course_instance.setGrades([]);

    grade_instance.setClass(course_instance);

    this.dialogRef.close({
      grade_instance
    });
  }

  protected cancelResponse() {
    this.dialogRef.close(null);
  }

  protected readonly ECGradeDialogMode = EGradeDialogMode;
}

interface IGradeDialogData {
  DIALOG_MODE: EGradeDialogMode,
  grade_instance: Grade | undefined,
  course_instance: Class | undefined
}

export interface IGradeDialogResult {
  grade_instance: Grade | undefined
}

export enum EGradeDialogMode {
  CREATE,
  EDIT
}
