import {Injectable} from "@angular/core";
import UserController from "../controllers/UserController";
import AuthLoginDetails from "../models/dtos/AuthLoginDetails";
import {HttpStatusCode} from "@angular/common/http";

// Define the service as injectable and include the AuthenticationController provider
@Injectable()
export default class UserService {
  constructor(private user_controller: UserController) {
  }

  // ! Business Logic
  // * User Exists
  public getUserIdFromVerifiedEmail(credentials: AuthLoginDetails): Promise<String | null> {
    return new Promise<String | null>(
      (resolve, reject) => {
        this.user_controller.getUserByVerifiedEmail(credentials).subscribe({
          next: (res: String | null) => {
            resolve(res);
          },
          error: (error) => {
            if (error.status === HttpStatusCode.NotFound) {
              resolve(null);
            } else {
              reject(error);
            }
          }
        })
      }
    )
  }
}
