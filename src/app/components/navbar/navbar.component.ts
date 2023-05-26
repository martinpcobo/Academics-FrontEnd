import {Component} from '@angular/core';
import {Router} from "@angular/router";
import AuthenticationService from "../../services/AuthenticationService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    protected router: Router,
    protected authentication_service: AuthenticationService,
  ) {
  }
}
