import {Injectable, OnInit} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export default class ThemeService {
  private theme: EThemeOptions = EThemeOptions.DARK_THEME;
  private theme_subj: Subject<EThemeOptions> = new Subject<EThemeOptions>();
  public theme_subscriber: Observable<EThemeOptions> = this.theme_subj.asObservable();

  constructor() {
    let theme: string | null = localStorage.getItem('theme');
    if (theme) {
      this.theme = parseInt(theme);
    }
  }

  public setTheme(theme_option: EThemeOptions): void {
    this.theme = theme_option;
    this.theme_subj.next(theme_option);
    localStorage.setItem('theme', theme_option.toString());
  }

  public getTheme(): EThemeOptions {
    return this.theme;
  }

  public getThemeObserver(): Observable<EThemeOptions> {
    return this.theme_subscriber;
  }

  public getThemeCSSClass(): string {
    if (this.theme == EThemeOptions.DARK_THEME) return 'dark-theme';

    return 'light-theme';
  }
}

export enum EThemeOptions {
  LIGHT_THEME,
  DARK_THEME
}
