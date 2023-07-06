import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticateComponent} from "./components/authenticate/authenticate.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import UserService from "../../services/UserService";
import UserController from "../../controllers/UserController";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import AuthenticatorService from "../../services/AuthenticatorService";
import AuthenticationService from "../../services/AuthenticationService";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    AuthenticateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  exports: [
    AuthenticateComponent
  ],
  providers: [
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}
  ]
})
export class AuthenticateModule {
}
