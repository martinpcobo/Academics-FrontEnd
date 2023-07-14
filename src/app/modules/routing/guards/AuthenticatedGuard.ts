import {Injectable} from "@angular/core";
import AuthenticationService from "../../../services/AuthenticationService";
import {Router} from "@angular/router";
import ToastService, {ToastType} from "../../../services/ToastService";

@Injectable({
  providedIn: 'root'
})
export default class AuthenticatedGuard {
  constructor(private authenticate_service: AuthenticationService, private toast_service: ToastService, private router: Router) {}
  public canActivate(): boolean {
    let authenticated: boolean = this.authenticate_service.getUser() != null;
    if (!authenticated) {
      //this.router.navigate(['/login']);
      //return false;
      return true;
    } else {
      return true;
    }
  }
}
