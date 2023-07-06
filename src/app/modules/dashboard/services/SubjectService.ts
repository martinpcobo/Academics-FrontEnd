import {Injectable} from "@angular/core";
import {Subject} from "../../../models/Subject";
import {SubjectController} from "../controllers/SubjectController";

@Injectable()
export default class SubjectService {
  constructor(private subject_controller: SubjectController) {
  }

  // ! Business Logic

  // * Get all subjects
  public async getAllSubjects(): Promise<Subject[]> {
    return new Promise<Subject[]>((resolve, reject) => {
      this.subject_controller.getAllSubjects().subscribe({
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
}
