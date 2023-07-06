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
import {MatTabsModule} from "@angular/material/tabs";
import ThemeService from "./services/ThemeService";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import AuthenticationService from "./services/AuthenticationService";
import {ProfileComponent} from "./modules/dashboard/components/profile/profile.component";
import {AuthenticatorComponent} from "./modules/dashboard/components/profile/authenticator/authenticator.component";
import AuthenticationController from "./modules/authenticate/controllers/AuthenticationController";
import AuthenticatorController from "./modules/authenticate/controllers/AuthenticatorController";
import {HttpClient} from "@angular/common/http";
import {DashboardComponent} from './modules/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    PageNotFoundComponent,
    ProfileComponent,
    AuthenticatorComponent,
    DashboardComponent,
  ],
  imports: [
    RoutingModule,
    AuthenticateModule,
    DashboardModule,

    BrowserModule,
    RouterOutlet,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [
    ToastService,
    ToastComponent,
    ThemeService,
    AuthenticationService,
    HttpClient,
    AuthenticationController,
    AuthenticatorController
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
