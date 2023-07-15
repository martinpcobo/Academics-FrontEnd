import {Injectable} from "@angular/core";
import AuthenticationService from "../../../services/AuthenticationService";
import {Router} from "@angular/router";
import ToastService, {ToastType} from "../../../services/ToastService";
import {EUserRoles} from "../../../../models/User";

@Injectable({
  providedIn: 'root'
})
export default class ProfessorGuard {
  constructor(private authenticate_service: AuthenticationService, private toast_service: ToastService, private router: Router) {
  }

  public canActivate(): boolean {
    let is_professor: boolean | undefined = this.authenticate_service.getUser()?.getRoles()?.includes(EUserRoles.PROFESSOR);
    if (!is_professor) {
      this.toast_service.setMessage('You are not a professor', ToastType.WARNING);
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
