import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./components/home/home.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {CollapseNavbarDirective} from "./directives/CollapseNavbarDirective";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CollapseNavbarDirective,
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet
  ],
  exports: [
    HomeComponent,
    NavbarComponent,
  ]
})
export class DashboardModule {
}
