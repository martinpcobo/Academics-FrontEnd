import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticateComponent} from "./components/authenticate/authenticate.component";
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'courses', component: HomeComponent},
      {path: 'career', component: HomeComponent},
      {path: 'grades', component: HomeComponent}
    ]
  },
  {path: 'login', component: AuthenticateComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
