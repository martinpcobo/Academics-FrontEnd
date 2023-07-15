import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import AuthenticationService from "../../../../services/AuthenticationService";
import ThemeService, {EThemeOptions} from "../../../../services/ThemeService";
import User, {EUserRoles} from "../../../../../models/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  protected user: User | null = null;

  constructor(
    protected router: Router,
    protected authentication_service: AuthenticationService,
    protected theme_service: ThemeService
  ) {
  }

  ngOnInit() {
    this.user = this.authentication_service.getUser();
    this.authentication_service.getUserObserver().subscribe({
      next: (new_user: User | null) => {
        this.user = new_user;
      },
      error: (error) => {
        this.user = null;
      }
    });
  }

  protected parseUserRoles(): String | undefined {
    return this.user?.getRoles()?.toString().split(',').map((role) => {
      return role[0] + role.toLowerCase().slice(1, role.length);
    }).join(', ').replace('None', '');
  }

  protected readonly EThemeOptions = EThemeOptions;
  protected readonly ERoles = EUserRoles;
}
