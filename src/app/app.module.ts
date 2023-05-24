import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {ToastComponent} from './components/toast/toast.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import AuthenticationController from "./controllers/AuthenticationController";
import AuthenticationService from "./services/AuthenticationService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from "@angular/router";
import ToastService from "./services/ToastService";
import AuthenticatorService from "./services/AuthenticatorService";
import AuthenticatorController from "./controllers/AuthenticatorController";
import UserController from "./controllers/UserController";
import UserService from "./services/UserService";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    ToastComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    AuthenticationController,
    AuthenticationService,
    HttpClient,
    JwtHelperService,
    ToastService,
    ToastComponent,
    AuthenticatorService,
    AuthenticatorController,
    UserService,
    UserController,

    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
