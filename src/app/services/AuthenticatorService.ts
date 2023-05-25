import {Injectable} from "@angular/core";
import AuthenticatorController from "../controllers/AuthenticatorController";

// Define the service as injectable and include the AuthenticationController provider
@Injectable()
export default class AuthenticatorService {

  constructor(private authenticator_controller: AuthenticatorController) {
  }

  // ! Business Logic
  // * Authenticator Exists
  public userHasAuthenticators(username: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authenticator_controller.getAuthenticatorCountByUsername(username).subscribe({
        next: (res: Number) => {
          resolve(res.valueOf() > 0);
        },
        error: (error) => {
          resolve(false);
        }
      });
    });
  }

}
