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
        next: (subjects: Object[]) => {
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
  public async createSubject(subject_instance: Subject): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.subject_controller.createSubject(subject_instance, this.authentication_service.getToken()).subscribe({
        next: (res: Subject) => {
          resolve(true);
        },
        error: (error: any) => {
          resolve(false)
        },
      });
    })
  }

  // * Modify a Subject
  public async modifySubject(subject_instance: Subject): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.subject_controller.modifySubject(subject_instance, this.authentication_service.getToken()).subscribe({
        next: (res: Subject) => {
          resolve(true);
        },
        error: (error: any) => {
          resolve(false)
        },
      });
    })
  }

  // * Delete a Subject
  public async deleteSubject(subject_id: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.subject_controller.deleteSubject(subject_id, this.authentication_service.getToken()).subscribe({
        next: (res: String) => {
          resolve(true);
        },
        error: (error: any) => {
          resolve(false)
        },
      });
    })
  }
}
