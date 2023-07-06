import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./components/home/home.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {CollapseNavbarDirective} from "./directives/CollapseNavbarDirective";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import ThemeService from "../../services/ThemeService";
import AuthenticationService from "../../services/AuthenticationService";
import {UserManagementComponent} from "./components/user-management/user-management.component";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CoursesComponent} from "./components/courses/courses.component";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CoursesComponent,
    CollapseNavbarDirective,
    UserManagementComponent
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
    HomeComponent,
    NavbarComponent
  ]
})
export class DashboardModule {
}
