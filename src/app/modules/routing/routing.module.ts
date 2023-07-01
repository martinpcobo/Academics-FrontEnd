import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticateComponent} from "../authenticate/components/authenticate/authenticate.component";
import {HomeComponent} from "../dashboard/components/home/home.component";
import {PageNotFoundComponent} from "../../components/page-not-found/page-not-found.component";
import {CoursesComponent} from "../dashboard/components/courses/courses.component";
import {ProfileComponent} from "../dashboard/components/profile/profile.component";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: 'courses', component: CoursesComponent},
      {path: 'career', component: HomeComponent},
      {path: 'grades', component: HomeComponent},
      {path: 'profile', component: ProfileComponent},

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
