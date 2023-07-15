import {Injectable} from "@angular/core";
import UserController from "../controllers/UserController";
import User from "../../models/User";
import AuthenticationService from "./AuthenticationService";

// Define the service as injectable and include the AuthenticationController provider
@Injectable()
export default class UserService {
  constructor(
    private user_controller: UserController,
    private authentication_service: AuthenticationService
  ) {
  }

  // ! Business Logic

  // * Get all users
  public async getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.user_controller.getUsersList(this.authentication_service.getToken()).subscribe({
        next: (users: User[]) => {
          console.log(users);
          resolve(users.map((user: Object) => {
            return new User(user as User);
          }));
        },
        error: (e) => {
          console.log(e);
          resolve([]);
        }
      });
    });
  }

  // * Get a User by Id
  public async getUserById(user_id: String): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.user_controller.getUserById(user_id, this.authentication_service.getToken()).subscribe({
        next: (user: User) => {
          resolve(new User(user as User));
        },
        error: (e) => {
          resolve(e);
        }
      });
    });
  }

  // * [ADMIN] Modify existing user
  public async modifyUser(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.user_controller.modifyUser(user, this.authentication_service.getToken()).subscribe({
        next: (res: String) => {
          console.log("SERVICE");
          console.log(user);
          resolve(true);
        },
        error: (e) => {
          resolve(false);
        }
      });
    });
  }

  // * [USER] Modify existing user
  public async modifyUserSecure(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.user_controller.modifyUserSecure(user, this.authentication_service.getToken()).subscribe({
        next: (res: String) => {
          resolve(true);
        },
        error: (e) => {
          resolve(false);
        }
      });
    });
  }

  // * Delete user
  public async deleteUser(user_id: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.user_controller.deleteUser(user_id, this.authentication_service.getToken()).subscribe({
        next: (res: String) => {
          resolve(true);
        },
        error: (e) => {
          resolve(false);
        }
      });
    });
  }

  // * Create user
  public async createUser(user: User, password: String): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.user_controller.createUser(user, password, this.authentication_service.getToken()).subscribe({
        next: (user_instance: Object) => {
          resolve(new User(user_instance as User));
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }
}
