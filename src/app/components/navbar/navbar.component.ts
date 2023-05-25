import {Component, Directive, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  protected navbar_state = NavBarStates.COLLAPSED;

  protected readonly NavBarStates = NavBarStates;
}

enum NavBarStates {
  COLLAPSED,
  EXPANDED
}
