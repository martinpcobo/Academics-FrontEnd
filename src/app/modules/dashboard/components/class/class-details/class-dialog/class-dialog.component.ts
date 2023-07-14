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

@Component({
  selector: 'app-user-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss'],
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

export class ClassDialogComponent implements OnInit {
  // ! Attributes
  protected class_details: FormGroup = new FormGroup({
    start_date: new FormControl(this.data.class_instance?.getStartDate(), [Validators.required]),
    end_date: new FormControl(this.data.class_instance?.getEndDate(), [Validators.required]),
    name: new FormControl(this.data.class_instance?.getName(), [Validators.required]),
    description: new FormControl(this.data.class_instance?.getDescription(), [Validators.required]),
    subject: new FormControl(this.data.class_instance?.getSubject()?.getName(), [Validators.required]),
    professors: new FormControl('', []),
    students: new FormControl(this.data.class_instance?.getStudents(), []),
  });
  private professor_list: Professor[] = [];
  protected selected_professors: Professor[] = [];
  protected filtered_professors: Observable<Professor[]> = new Observable<Professor[]>();

  protected subject_list: Subject[] = [];
  protected filtered_subjects: Observable<Subject[]> = new Observable<Subject[]>();
  protected selected_subject: Subject | undefined = undefined;

  private student_list: Student[] = [];
  protected selected_students: Student[] = [];
  protected filtered_students: Observable<Student[]> = new Observable<Student[]>();

  protected separatorKeysCodes: number[] = [ENTER, COMMA];

  // ! Constructor
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IClassDialogData,
    protected dialogRef: MatDialogRef<ClassDialogComponent>,
    protected toast_service: ToastService,
    protected professor_service: ProfessorService,
    protected student_service: StudentService,
    protected subject_service: SubjectService,
  ) {
  }

  // ! Business Logic

  // * Chips Methods

  // Professors
  protected addProfessor(event: MatChipInputEvent): void {
    if (event.value) {
      let professor_instance: Professor | undefined = this.professor_list.filter((professor_instance: Professor) => {
        return professor_instance.getUser()?.getName()?.includes(event.value) && !this.selected_professors.includes(professor_instance);
      })[0];

      if (professor_instance) {
        this.selected_professors.push(professor_instance);
      }
    }

    // Clear the input value
    this.class_details.controls['professors'].setValue('');
    event.chipInput!.clear();
  }

  protected removeProfessor(professor_ind: Professor): void {
    this.selected_professors = this.selected_professors.filter((professor_instance: Professor) => {
      return professor_instance.getUser()?.getIdentifier() != professor_ind.getIdentifier();
    });
  }

  protected autocompleteProfessor(event: MatAutocompleteSelectedEvent): void {
    if (event.option) {
      let professor_instance: Professor | undefined = this.professor_list.filter((professor_instance: Professor) => {
        return professor_instance.getUser()?.getIdentifier()?.includes(event.option.value) && !this.selected_professors.includes(professor_instance);
      })[0]

      if (professor_instance) {
        this.selected_professors.push(professor_instance);
      }
    }

    this.class_details.controls['professors'].setValue('');
  }

  // Students

  protected addStudent(event: MatChipInputEvent): void {
    if (event.value) {
      let student_instance: Student | undefined = this.student_list.filter((student_instance: Student) => {
        return student_instance.getUser()?.getName()?.includes(event.value) && !this.selected_students.includes(student_instance);
      })[0];

      if (student_instance) {
        this.selected_students.push(student_instance);
      }
    }

    // Clear the input value
    this.class_details.controls['students'].setValue('');
    event.chipInput!.clear();
  }

  protected removeStudent(student_ind: Student): void {
    this.selected_students = this.selected_students.filter((student_instance: Student) => {
      return student_instance.getUser()?.getIdentifier() != student_ind.getIdentifier();
    });
  }

  protected autocompleteStudent(event: MatAutocompleteSelectedEvent): void {
    if (event.option) {
      let student_instance: Student | undefined = this.student_list.filter((student_instance: Student) => {
        return student_instance.getUser()?.getIdentifier()?.includes(event.option.value) && !this.selected_students.includes(student_instance);
      })[0];

      if (student_instance) {
        this.selected_students.push(student_instance);
      }
    }

    this.class_details.controls['students'].setValue('');
  }

  // * Dialog Methods
  async ngOnInit(): Promise<void> {
    this.professor_list = await this.professor_service.getAllProfessors();
    this.student_list = await this.student_service.getAllStudents();
    this.subject_list = await this.subject_service.getAllSubjects();

    this.selected_professors = this.data.class_instance?.getProfessors() || [];
    this.selected_students = this.data.class_instance?.getStudents() || [];
    this.selected_subject = this.data.class_instance?.getSubject();

    this.filtered_professors = this.class_details.controls['professors'].valueChanges.pipe(
      startWith(this.data.class_instance?.getProfessors()),
      map((value: String | null) => {
        if (value) {
          return this.professor_list.filter((professor_ind: Professor) => {
            return professor_ind.getUser()?.getName()?.includes(value.toString()) && !this.selected_professors.includes(professor_ind);
          });
        } else {
          return [];
        }
      }),
    );

    this.filtered_students = this.class_details.controls['students'].valueChanges.pipe(
      startWith(this.data.class_instance?.getStudents()),
      map((value: String | null) => {
          if (value) {
            return this.student_list.filter((student_ind: Student) => {
              return student_ind.getUser()?.getName()?.includes(value.toString()) && !this.selected_students.includes(student_ind);
            });
          } else {
            return [];
          }
        }
      )
    );

    this.filtered_subjects = this.class_details.controls['subject'].valueChanges.pipe(
      startWith(this.data.class_instance?.getSubject()),
      map((value: String | null) => {

        if (value) {
          return this.subject_list.filter((subject_ind: Subject) => {
            return subject_ind.getName()?.includes(value.toString()) && this.selected_subject != subject_ind;
          });
        } else {
          return [];
        }
      }),
    );
  }

  protected submitClassCreation(): void {
    if (
      this.class_details.invalid ||
      this.class_details.controls['start_date'].value.length == 0 ||
      this.class_details.controls['end_date'].value.length == 0 ||
      this.class_details.controls['name'].value.length == 0 ||
      this.class_details.controls['description'].value.length == 0 ||
      this.selected_subject == undefined
    ) {
      this.toast_service.setMessage("Missing information for class creation", ToastType.DANGER);
      return;
    }

    let class_instance: Class = new Class(undefined);
    class_instance.setStartDate(this.class_details.controls['start_date'].value);
    class_instance.setEndDate(this.class_details.controls['end_date'].value);
    class_instance.setName(this.class_details.controls['name'].value);
    class_instance.setDescription(this.class_details.controls['description'].value);
    class_instance.setSubject(this.selected_subject);
    class_instance.setProfessors(this.selected_professors);
    class_instance.setStudents(this.selected_students);

    this.dialogRef.close({
      class_instance
    });
  }

  protected submitClassEdit(): void {
    if (
      this.class_details.invalid ||
      this.class_details.controls['start_date'].value.length == 0 ||
      this.class_details.controls['end_date'].value.length == 0 ||
      this.class_details.controls['name'].value.length == 0 ||
      this.class_details.controls['description'].value.length == 0 ||
      this.selected_subject == undefined
    ) {
      this.toast_service.setMessage("Missing information for class creation", ToastType.DANGER);
      return;
    }

    let class_instance: Class = new Class(this.data.class_instance);
    class_instance.setStartDate(this.class_details.controls['start_date'].value);
    class_instance.setEndDate(this.class_details.controls['end_date'].value);
    class_instance.setName(this.class_details.controls['name'].value);
    class_instance.setDescription(this.class_details.controls['description'].value);
    class_instance.setSubject(this.selected_subject);
    class_instance.setProfessors(this.selected_professors);
    class_instance.setStudents(this.selected_students);

    this.dialogRef.close({
      class_instance
    });
  }

  protected cancelResponse() {
    this.dialogRef.close(null);
  }

  protected readonly EClassDialogMode = EClassDialogMode;
}

interface IClassDialogData {
  DIALOG_MODE: EClassDialogMode,
  class_instance: Class | undefined
}

export interface IClassDialogResult {
  class_instance: Class | undefined
}

export enum EClassDialogMode {
  CREATE,
  EDIT
}
