import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
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
import AuthenticationController from "./controllers/AuthenticationController";
import AuthenticatorController from "./controllers/AuthenticatorController";
import {HttpClient} from "@angular/common/http";
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import AuthenticatorService from "./services/AuthenticatorService";
import UserController from "./controllers/UserController";
import UserService from "./services/UserService";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ClassDetailsComponent } from './modules/dashboard/components/class/class-details/class-details.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ProfileComponent,
    AuthenticatorComponent,
    DashboardComponent,
    ClassDetailsComponent,
  ],
    imports: [
        RoutingModule,
        AuthenticateModule,
        DashboardModule,
        MatChipsModule,

        BrowserModule,
        RouterOutlet,
        MatTabsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
  providers: [
    ToastService,
    ThemeService,
    HttpClient,
    MatSnackBar,

    AuthenticationController,
    AuthenticationService,

    AuthenticatorController,
    AuthenticatorService,

    UserController,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
