import {Injectable} from "@angular/core";
import AuthenticationService from "../../../services/AuthenticationService";
import {ProfessorController} from "../controllers/ProfessorController";
import {Professor} from "../../../../models/Professor";
import User from "../../../../models/User";
import {Course} from "../../../../models/Course";
import UserService from "../../../services/UserService";

@Injectable()
export default class ProfessorService {
  constructor(
    private professor_controller: ProfessorController,
    private authentication_service: AuthenticationService,
    private user_service: UserService
  ) {
  }

  // ! Business Logic

  // * Create Professor Profile
  public async createProfessorProfile(user_id: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.professor_controller.createProfessorProfile(user_id, this.authentication_service.getToken()).subscribe({
        next: (professor: any) => {
          resolve(true);
        },
        error: (error: any) => {
          resolve(false);
        },
      });
    })
  }

  // * Delete Professor Profile
  public async deleteProfessorProfile(professor_id: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.professor_controller.deleteProfessorProfile(professor_id, this.authentication_service.getToken()).subscribe({
        next: (professor: any) => {
          resolve(true);
        },
        error: (error: any) => {
          resolve(false);
        },
      });
    })
  }

  // * Get all Professors
  public async getAllProfessors(): Promise<Professor[]> {
    return new Promise<Professor[]>((resolve, reject) => {
      console.log(this.authentication_service.getToken());
      this.professor_controller.getAllProfessors(this.authentication_service.getToken()).subscribe({
        next: (professors: Object[]) => {
          resolve(professors.map((professor: any) => {
            let professor_instance: Professor = new Professor(professor as Professor);
            professor_instance.setUser(new User(professor.user as User));
            professor_instance.setCourses(professor.courses.map((course_obj: Object) => {
              return new Course(course_obj as Course);
            }))

            return professor_instance;
          }))
        },
        error: (error: any) => {
          resolve([])
        },
      });
    })
  }

  // * Get a Professor
  public async getProfessor(professor_id: String): Promise<Professor> {
    return new Promise<Professor>((resolve, reject) => {
      this.professor_controller.getProfessor(professor_id, this.authentication_service.getToken()).subscribe({
        next: (professor: any) => {
          let professor_instance: Professor = new Professor(professor as Professor);
          professor_instance.setCourses(professor.courses.map((course_obj: Object) => {
            return new Course(course_obj as Course);
          }));

          professor_instance.setUser(new User(professor.user as User));
          resolve(professor_instance);
        },
        error: (error: any) => {
          resolve(error);
        },
      });
    })
  }

}
