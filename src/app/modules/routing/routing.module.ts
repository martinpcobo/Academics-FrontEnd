import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticateComponent} from "../authenticate/components/authenticate/authenticate.component";
import {PageNotFoundComponent} from "../../components/page-not-found/page-not-found.component";
import {CoursesComponent} from "../dashboard/components/my-courses/courses.component";
import {ProfileComponent} from "../dashboard/components/profile/profile.component";
import {UserListComponent} from "../dashboard/components/user-list/user-list.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ClassListComponent} from "../dashboard/components/class/class-list/class-list.component";
import {SubjectListComponent} from "../dashboard/components/subject-list/subject-list.component";
import AuthenticatedGuard from "./guards/AuthenticatedGuard";
import {ClassDetailsComponent} from "../dashboard/components/class/class-details/class-details.component";
import {ClassComponent} from "../dashboard/components/class/class.component";
import {GradesComponent} from "../dashboard/components/my-grades/grades.component";
import StudentGuard from "./guards/StudentGuard";
import ProfessorGuard from "./guards/ProfessorGuard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      {
        path: 'my-courses',
        component: CoursesComponent,
        canActivate: [
          StudentGuard
        ]
      },
      {
        path: 'my-grades',
        component: GradesComponent,
        canActivate: [
          StudentGuard
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [
          ProfessorGuard
        ]
      },
      {
        path: 'subjects',
        component: SubjectListComponent,
        canActivate: [
          ProfessorGuard
        ]
      },
      {
        path: 'class',
        component: ClassComponent,
        children: [
          {
            path: 'list',
            component: ClassListComponent,
            canActivate: [
              ProfessorGuard
            ]
          },
          {
            path: ':id',
            component: ClassDetailsComponent,
            canActivate: [
              ProfessorGuard
            ]
          },
        ],
        canActivate: [
          ProfessorGuard
        ]
      }
    ],
    canActivate: [
      AuthenticatedGuard
    ],
  },
  {
    path: 'login',
    component: AuthenticateComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {
}
