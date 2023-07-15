import {Injectable} from "@angular/core";
import AuthenticationService from "../../../services/AuthenticationService";
import {Router} from "@angular/router";
import ToastService from "../../../services/ToastService";

@Injectable({
  providedIn: 'root'
})
export default class AuthenticatedGuard {
  constructor(private authenticate_service: AuthenticationService, private toast_service: ToastService, private router: Router) {
  }

  public async canActivate(): Promise<boolean> {
    let authenticated: boolean = this.authenticate_service.getUser() != null;
    if (!authenticated) {
      if (await this.authenticate_service.retrieveToken()) {
        return true;
      } else {
        await this.router.navigate(['/login']);
        return false;
      }
    } else {
      return true;
    }
  }
}
