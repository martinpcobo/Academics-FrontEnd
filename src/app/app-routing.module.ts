import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticateComponent} from "./components/authenticate/authenticate.component";
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AuthenticateComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
