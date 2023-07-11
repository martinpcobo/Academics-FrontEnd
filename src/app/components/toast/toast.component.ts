import {Component, OnInit} from '@angular/core';
import ToastService, {ToastMessage} from "../../services/ToastService";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  constructor(private toast_service: ToastService, private _snackBar: MatSnackBar) {
  }

  protected readonly ToastType = ToastType;

  ngOnInit() {
    this.toast_service.getMessage().subscribe({
      next: (message: ToastMessage | null) => {
        if (message) {
          let icon: String = '🔴';

          switch (message.type) {
            case ToastType.SUCCESS:
              icon = '🟢';
              break;
            case ToastType.WARNING:
              icon = '🟠';
              break;
            case ToastType.INFO:
              icon = '🔵';
              break;
            case ToastType.DANGER:
              icon = '🔴';
              break;
          }

          this._snackBar.open(icon + ' ' +  message.body.toString(), 'Close', {
            duration: message.timeout
          });
        }
      },
      error: (error: any) => {
        console.error("Could not display toast message!");
      }
    })
    this.toast_service.setMessage('Subject', 'Body', ToastType.INFO, 5000);
  }
}

export enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}
