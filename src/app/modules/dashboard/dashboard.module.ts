import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {CollapseNavbarDirective} from "./directives/CollapseNavbarDirective";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {UserListComponent} from "./components/user-list/user-list.component";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CoursesComponent} from "./components/my-courses/courses.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ClassListComponent} from "./components/class/class-list/class-list.component";
import {SubjectListComponent} from "./components/subject-list/subject-list.component";
import ClassService from "./services/ClassService";
import SubjectService from "./services/SubjectService";
import {ClassController} from "./controllers/ClassController";
import {SubjectController} from "./controllers/SubjectController";
import {HttpClient} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import ProfessorService from "./services/ProfessorService";
import {ProfessorController} from "./controllers/ProfessorController";
import StudentService from "./services/StudentService";
import {StudentController} from "./controllers/StudentController";
import GradeService from "./services/GradeService";
import {GradeController} from "./controllers/GradeController";
import {GradesComponent} from "./components/my-grades/grades.component";
import {ClassComponent} from "./components/class/class.component";


@NgModule({
  declarations: [
    NavbarComponent,
    CoursesComponent,
    CollapseNavbarDirective,
    UserListComponent,
    ClassListComponent,
    SubjectListComponent,
    GradesComponent,
    ClassComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule
  ],
  providers: [
    ClassService,
    ClassController,
    StudentService,
    GradeService,
    GradeController,
    StudentController,
    ProfessorService,
    ProfessorController,
    HttpClient,

    SubjectService,
    SubjectController
  ],
  exports: [
    NavbarComponent
  ]
})
export class DashboardModule {
}
