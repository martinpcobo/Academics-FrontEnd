import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Subject} from "../../../models/Subject";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SubjectController {
  constructor(private http: HttpClient) {
  }

  // ! Endpoints

  // * Get all subjects
  public getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>('/api/subjects');
  }
}
