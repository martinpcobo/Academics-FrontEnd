import {Injectable} from "@angular/core";
import {ToastType} from "../components/toast/toast.component";
import {Observable, Subject} from "rxjs";

@Injectable()
export default class ToastService {
  private defaultTimeout: number = 5000;

  private message: Subject<ToastMessage | null> = new Subject<ToastMessage | null>();
  private message$: Observable<ToastMessage | null> = this.message.asObservable();

  public getMessage(): Observable<ToastMessage | null> {
    return this.message$;
  }

  public setMessage(subject: String, body: String, type: ToastType, timeout: number = this.defaultTimeout): void {
    this.message.next({subject, body, type, timeout});
  }
}

export interface ToastMessage {
  body: String;
  subject: String
  type: ToastType;
  timeout: number;
}
