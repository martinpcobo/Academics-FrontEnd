import {Injectable} from "@angular/core";
import AuthenticatorController from "../controllers/AuthenticatorController";
import Authenticator from "../../models/Authenticator";
import ToastService, {ToastType} from "./ToastService";
import AuthenticationService from "./AuthenticationService";

// Define the service as injectable and include the AuthenticationController provider
@Injectable()
export default class AuthenticatorService {

  constructor(
    private authenticator_controller: AuthenticatorController,
    private authentication_service: AuthenticationService,
    private toast_service: ToastService
  ) {
  }

  // ! Business Logic
  // * Authenticators Exist
  public userHasAuthenticators(username: String): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let token: String | null = await this.authentication_service.getToken();
      this.authenticator_controller.getAuthenticatorCountByUsername(username).subscribe({
        next: (res: Number) => {
          resolve(res.valueOf() > 0);
        },
        error: (error) => {
          resolve(false);
        },
      });
    });
  }

  // * Get Authenticators
  public getAuthenticatorsFromUser(user_id: String): Promise<Authenticator[]> {
    return new Promise<Authenticator[]>(async (resolve, reject) => {
      let token: String | null = await this.authentication_service.getToken();
      if (token) {
        this.authenticator_controller.getAuthenticatorsFromUser(user_id, token).subscribe({
          next: (res: Object[]) => {
            console.log(res);
            resolve(res.map((auth_instance: Object) => {
              return new Authenticator(auth_instance as Authenticator);
            }));
          },
          error: (error) => {
            resolve([]);
          },
        });
      } else {
        console.log("Could not perform this operation, user is not logged in.");
      }
    });
  }

  // * Delete Authenticator
  public removeAuthenticator(authenticator_id: String, user_id: String): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let token: String | null = await this.authentication_service.getToken();
      if (token) {
        this.authenticator_controller.removeAuthenticator(authenticator_id, user_id, token).subscribe({
          next: (res: any) => {
            this.toast_service.setMessage("Authenticator deleted successfully", ToastType.SUCCESS)
            resolve(true);
          },
          error: (error) => {
            this.toast_service.setMessage("Failed to delete authenticator" , ToastType.DANGER)
            resolve(false);
          },
        });
      } else {
        console.log("Could not perform this operation, user is not logged in.");
      }
    });
  }

  // * Rename Authenticator
  public modifyAuthenticatorName(authenticator_id: String, user_id: String, new_name: String): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let token: String | null = await this.authentication_service.getToken();
      if (token) {
        this.authenticator_controller.modifyAuthenticatorName(authenticator_id, user_id, new_name, token).subscribe({
          next: (res: any) => {
            this.toast_service.setMessage("Authenticator renamed successfully", ToastType.SUCCESS)
            resolve(true);
          },
          error: (error) => {
            this.toast_service.setMessage("Failed to rename authenticator", ToastType.DANGER)
            resolve(false);
          },
        });
      } else {
        console.log("Could not perform this operation, user is not logged in.");
      }
    });
  }

}
