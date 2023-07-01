import {Injectable} from "@angular/core";
import UserController from "../controllers/UserController";

// Define the service as injectable and include the AuthenticationController provider
@Injectable()
export default class UserService {
  constructor(private user_controller: UserController) {
  }

  // ! Business Logic
}
