import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  theme: EThemeOptions = EThemeOptions.DARK_THEME;

  protected readonly EThemeOptions = EThemeOptions;

}

enum EThemeOptions {
  LIGHT_THEME,
  DARK_THEME
}
