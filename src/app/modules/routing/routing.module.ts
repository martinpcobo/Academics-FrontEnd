import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticateComponent} from "../authenticate/components/authenticate/authenticate.component";
import {PageNotFoundComponent} from "../../components/page-not-found/page-not-found.component";
import {CoursesComponent} from "../dashboard/components/courses/courses.component";
import {ProfileComponent} from "../dashboard/components/profile/profile.component";
import {UserListComponent} from "../dashboard/components/user-list/user-list.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ClassListComponent} from "../dashboard/components/class-list/class-list.component";
import {SubjectListComponent} from "../dashboard/components/subject-list/subject-list.component";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {path: 'courses', component: CoursesComponent},
      {path: 'career', component: DashboardComponent},
      {path: 'grades', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'users', component: UserListComponent},
      {path: 'subjects', component: SubjectListComponent},
      {path: 'classes', component: ClassListComponent}
    ]
  },
  {path: 'login', component: AuthenticateComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class RoutingModule {
}
