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

@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    ToastComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    AuthenticationController,
    AuthenticationService,
    HttpClient,
    JwtHelperService,
    ToastComponent,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
