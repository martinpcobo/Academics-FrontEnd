import {Component, OnInit} from '@angular/core';
import ToastService, {ToastMessage} from "../../services/ToastService";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  protected message: ToastMessage | null = null;

  constructor(private toast_service: ToastService) {
  }

  protected readonly ToastType = ToastType;

  ngOnInit() {
    this.toast_service.getMessage().subscribe({
      next: (message: ToastMessage | null) => {
        this.message = message;
        if (message) {
          setTimeout(() => {
            this.message = null;
          }, message.timeout)
        }
      },
      error: (error: any) => {
        console.error("Could not display toast message!");
      }
    })
  }
}

export enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}
