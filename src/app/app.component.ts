import {Component} from '@angular/core';
import ThemeService, {EThemeOptions} from "./services/ThemeService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected theme_css_class: string = this.theme_service.getThemeCSSClass();

  constructor(protected theme_service: ThemeService) {
    this.theme_service.getThemeObserver().subscribe({
      next: (theme_option: EThemeOptions) => {
        this.theme_css_class = this.theme_service.getThemeCSSClass();
      },
      error: (e: any) => {
        this.theme_css_class = this.theme_service.getThemeCSSClass();
      }
    });
  }
}

