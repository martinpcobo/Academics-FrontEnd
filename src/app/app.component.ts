import {Component} from '@angular/core';
import ThemeService, {EThemeOptions} from "./services/ThemeService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected readonly EThemeOptions = EThemeOptions;

  constructor(protected theme_service: ThemeService) {
  }
}

