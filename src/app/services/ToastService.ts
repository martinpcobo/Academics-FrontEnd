import {Component, Injectable, Input} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export default class ToastService {
  private defaultTimeout: number = 5000;

  constructor(private _snackBar: MatSnackBar) {
  }

  public setMessage(message: String, type: ToastType, timeout: number = this.defaultTimeout): void {
    this._snackBar.dismiss();
    this._snackBar.open( message.toString(), 'Close', {
      duration: timeout,
      panelClass: [type]
    });

  }
}

export interface ToastMessage {
  body: String;
  subject: String
  type: ToastType;
  timeout: number;
}
export enum ToastType {
  SUCCESS = 'snackbar-success',
  INFO = 'snackbar-info',
  WARNING = 'snackbar-warning',
  DANGER = 'snackbar-danger'
}
