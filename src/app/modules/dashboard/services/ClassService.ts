import {Injectable} from "@angular/core";
import {Class} from "../../../../models/Class";
import {SubjectController} from "../controllers/SubjectController";
import {Subject} from "../../../../models/Subject";
import {ClassController} from "../controllers/ClassController";
import AuthenticationService from "../../../services/AuthenticationService";

@Injectable()
export default class ClassService {
  constructor(
    private class_controller: ClassController,
    private authentication_service: AuthenticationService
  ) {
  }

  // ! Business Logic

  // * Get all classes
  public async getAllClasses(): Promise<Class[]> {
    return new Promise<Class[]>((resolve, reject) => {
      console.log(this.authentication_service.getToken());
      this.class_controller.getAllClasses(this.authentication_service.getToken()).subscribe({
        next: (classes: Class[]) => {
          resolve(classes.map((class_instance: Object) => {
            return new Class(class_instance as Class);
          }))
        },
        error: (error: any) => {
          resolve([])
        },
      });
    })
  }
}
