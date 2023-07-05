import {Injectable} from "@angular/core";

@Injectable()
export default class ThemeService {
  private theme: EThemeOptions = EThemeOptions.DARK_THEME;

  public setTheme(theme_option: EThemeOptions): void {
    this.theme = theme_option;
  }

  public getTheme(): EThemeOptions {
    return this.theme;
  }

  public getThemeCSSClass(): string {
    if (this.getTheme() == EThemeOptions.DARK_THEME) return 'dark-theme';

    return 'light-theme';
  }
}

export enum EThemeOptions {
  LIGHT_THEME,
  DARK_THEME
}
