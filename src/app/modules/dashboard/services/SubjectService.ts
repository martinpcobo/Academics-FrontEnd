import {Injectable} from "@angular/core";
import {Subject} from "../../../../models/Subject";
import {SubjectController} from "../controllers/SubjectController";
import AuthenticationService from "../../../services/AuthenticationService";

@Injectable()
export default class SubjectService {
  constructor(private subject_controller: SubjectController, private authentication_service: AuthenticationService) {
  }

  // ! Business Logic

  // * Get all subjects
  public async getAllSubjects(): Promise<Subject[]> {
    return new Promise<Subject[]>((resolve, reject) => {
      this.subject_controller.getAllSubjects(this.authentication_service.getToken()).subscribe({
        next: (subjects: Subject[]) => {
          resolve(subjects.map((subject_instance: Object) => {
            return new Subject(subject_instance as Subject);
          }))
        },
        error: (error: any) => {
          resolve([])
        },
      });
    })
  }

  // * Create Subject
  public async createSubject(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.subject_controller.createSubject(this.authentication_service.getToken()).subscribe({
        next: (res: Subject) => {
          resolve(true);
        },
        error: (error: any) => {
          resolve(false)
        },
      });
    })
  }
}
