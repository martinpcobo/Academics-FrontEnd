import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import AuthenticationService from "../../../../services/AuthenticationService";
import ThemeService, {EThemeOptions} from "../../../../services/ThemeService";
import User from "../../../../models/User";

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

  protected readonly EThemeOptions = EThemeOptions;
}
