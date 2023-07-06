import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {CollapseNavbarDirective} from "./directives/CollapseNavbarDirective";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import ThemeService from "../../services/ThemeService";
import AuthenticationService from "../../services/AuthenticationService";
import {UserListComponent} from "./components/user-list/user-list.component";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CoursesComponent} from "./components/courses/courses.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ClassListComponent} from "./components/class-list/class-list.component";
import {SubjectListComponent} from "./components/subject-list/subject-list.component";


@NgModule({
  declarations: [
    NavbarComponent,
    CoursesComponent,
    CollapseNavbarDirective,
    UserListComponent,
    ClassListComponent,
    SubjectListComponent
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
    MatPaginatorModule
  ],
  providers: [
    ThemeService,
    AuthenticationService,
  ],
  exports: [
    NavbarComponent
  ]
})
export class DashboardModule {
}
