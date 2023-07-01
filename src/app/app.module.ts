import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {ToastComponent} from "./components/toast/toast.component";
import {RoutingModule} from "./modules/routing/routing.module";
import {AuthenticateModule} from "./modules/authenticate/authenticate.module";
import ToastService from "./services/ToastService";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {CoursesComponent} from './modules/dashboard/components/courses/courses.component';
import {ProfileComponent} from './modules/dashboard/components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    PageNotFoundComponent,
    CoursesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,

    RoutingModule,
    AuthenticateModule,
    DashboardModule
  ],
  providers: [
    ToastService,
    ToastComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
