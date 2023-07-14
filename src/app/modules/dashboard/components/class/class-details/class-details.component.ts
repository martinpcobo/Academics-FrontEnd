import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import ClassService from "../../../services/ClassService";
import {Class} from "../../../../../../models/Class";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ClassDialogComponent, EClassDialogMode, IClassDialogResult} from "./class-dialog/class-dialog.component";
import {Professor} from "../../../../../../models/Professor";
import {Student} from "../../../../../../models/Student";
import ToastService, {ToastType} from "../../../../../services/ToastService";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import ProfessorService from "../../../services/ProfessorService";
import {Grade} from "../../../../../../models/Grade";
import {EGradeDialogMode, GradeDialogComponent, IGradeDialogResult} from "./grade-dialog/grade-dialog.component";
import GradeService from "../../../services/GradeService";

interface IProfessorSource {
  id: String | undefined;
  first_name: String | undefined;
  last_name: String | undefined;
  email: String | undefined;
  professor_instance: Professor
}

interface IStudentSource {
  id: String | undefined;
  first_name: String | undefined;
  last_name: String | undefined;
  email: String | undefined;
  student_instance: Student
}

interface IGradeSource {
  id: String | undefined;
  grade: String | undefined;
  name: String | undefined;
  email: String | undefined;
  grade_instance: Grade;
}

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  private class_id: string | null = null;
  protected class_instance: Class | null = null;

  protected professor_source: MatTableDataSource<IProfessorSource> = new MatTableDataSource<IProfessorSource>([]);
  protected professor_columns: string[] = ['first_name', 'last_name', 'email'];

  @ViewChild(MatPaginator) professor_paginator: MatPaginator | null = null;
  @ViewChild(MatSort) professor_sort: MatSort | null = null;


  protected student_source: MatTableDataSource<IStudentSource> = new MatTableDataSource<IStudentSource>([]);
  protected student_columns: string[] = ['first_name', 'last_name', 'email'];

  @ViewChild(MatPaginator) student_paginator: MatPaginator | null = null;
  @ViewChild(MatSort) student_sort: MatSort | null = null;

  protected grades_source: MatTableDataSource<IGradeSource> = new MatTableDataSource<IGradeSource>([]);
  protected grades_columns: string[] = ['name', 'email', 'grade', 'actions'];

  @ViewChild(MatPaginator) grade_paginator: MatPaginator | null = null;
  @ViewChild(MatSort) grade_sort: MatSort | null = null;

  private refreshProfessorSource(): void {
    let professor_list: IProfessorSource[] = [];
    this.class_instance?.getProfessors()?.forEach((professor: Professor) => {
      professor_list.push({
        id: professor.getIdentifier(),
        first_name: professor.getUser()?.getFirstName(),
        last_name: professor.getUser()?.getLastName(),
        email: professor.getUser()?.getVerifiedEmail(),
        professor_instance: professor
      });
    });

    this.professor_source.data = professor_list;
  }

  private refreshStudentSource(): void {
    let student_list: IStudentSource[] = [];
    this.class_instance?.getStudents()?.forEach((student: Student) => {
      student_list.push({
        id: student.getIdentifier(),
        first_name: student.getUser()?.getFirstName(),
        last_name: student.getUser()?.getLastName(),
        email: student.getUser()?.getVerifiedEmail(),
        student_instance: student
      });
    });

    this.student_source.data = student_list;
  }

  private refreshGradesSource(): void {
    let grades_list: IGradeSource[] = [];
    this.class_instance?.getGrades()?.forEach((grade: Grade) => {
      grades_list.push({
        id: grade.getIdentifier(),
        grade: grade.getValue()?.toString(),
        name: grade.getStudent()?.getUser()?.getName(),
        email: grade.getStudent()?.getUser()?.getVerifiedEmail(),
        grade_instance: grade
      });
    });

    this.grades_source.data = grades_list;
  }

  protected handleGradeCreation(): void {
    const dialogRef: MatDialogRef<GradeDialogComponent> = this.dialog.open(GradeDialogComponent, {
      data: {
        DIALOG_MODE: EGradeDialogMode.CREATE,
        grade_instance: undefined,
        course_instance: this.class_instance
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(async (result: IGradeDialogResult): Promise<void> => {
      if (!result || !result.grade_instance) return;

      if (
        await this.grade_service.createGrade(result.grade_instance)
      ) {
        this.toast_service.setMessage("Grade has been created", ToastType.SUCCESS);
        await this.fetchClassDetails();
      } else {
        this.toast_service.setMessage("Grade could not be created", ToastType.DANGER);
      }
    });
  }

  protected async handleGradeDeletion(grade_instance: Grade): Promise<void> {
    let grade_id: String | undefined = grade_instance.getIdentifier();
    if(grade_id && await this.grade_service.deleteGradeById(grade_id)) {
      this.toast_service.setMessage("Grade has been deleted", ToastType.SUCCESS);
      await this.fetchClassDetails();
    } else {
      this.toast_service.setMessage("Grade could not be deleted", ToastType.DANGER);
    }

  }

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private class_service: ClassService,
    protected dialog: MatDialog,
    private toast_service: ToastService,
    private grade_service: GradeService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.class_id = params.get('id');
      await this.fetchClassDetails();
    })
  }

  private async fetchClassDetails() : Promise<void> {
    if(!this.class_id) return;

    let class_instance: Class = await this.class_service.getClassById(this.class_id);
    class_instance.setGrades(await this.grade_service.getGradesFromCourse(this.class_id));

    this.class_instance = class_instance;

    this.refreshProfessorSource();
    this.refreshStudentSource();
    this.refreshGradesSource();
  }

  protected handleClassEdit() {
    const dialogRef: MatDialogRef<ClassDialogComponent> = this.dialog.open(ClassDialogComponent, {
      data: {
        DIALOG_MODE: EClassDialogMode.EDIT,
        class_instance: this.class_instance
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(async (result: IClassDialogResult) => {
      if (!result || !result.class_instance) return;

      let professor_ids: String[] = [];
      result.class_instance?.getProfessors()?.forEach((professor_instance: Professor) => {
        let professor_id: String | undefined = professor_instance.getIdentifier();
        if (professor_id) {
          professor_ids.push(professor_id);
        }
      });

      let students_ids: String[] = [];
      result.class_instance?.getStudents()?.forEach((student_instance: Student) => {
        let student_id: String | undefined = student_instance.getIdentifier();
        if (student_id) {
          students_ids.push(student_id);
        }
      });

      let class_id: String | undefined = result.class_instance?.getIdentifier();

      if (
        class_id &&
        await this.class_service.alterClassProfessors(class_id, professor_ids) &&
        await this.class_service.alterClassStudents(class_id, students_ids)
      ) {
        this.toast_service.setMessage("Class has been modified", ToastType.SUCCESS);
        await this.fetchClassDetails();
      } else {
        this.toast_service.setMessage("Class could not be modified", ToastType.DANGER);
      }
    });
  }
}
