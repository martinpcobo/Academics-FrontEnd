import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Subject} from "../../../../models/Subject";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SubjectController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructors
  constructor(private http: HttpClient) {
  }

  // ! Endpoints

  // * Get all subjects

  public getAllSubjects(token: String | null): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.server_url + '/api/subject/', {
      headers: {
        Authentication: 'Bearer ' + token,
      }
    });
  }

  // * Create Subject
  public createSubject(subject_instance: Subject, token: String | null): Observable<Subject> {
    return this.http.post<Subject>(this.server_url + '/api/subject/', subject_instance, {
      headers: {
        Authentication: 'Bearer ' + token,
      }
    });
  }

  // * Modify Subject
  public modifySubject(subject_instance: Subject, token: String | null): Observable<Subject> {
    return this.http.put<Subject>(this.server_url + '/api/subject/', subject_instance, {
      headers: {
        Authentication: 'Bearer ' + token,
      }
    });
  }

  // * Delete a Subject
  public deleteSubject(subject_id: String, token: String | null): Observable<String> {
    return this.http.delete(this.server_url + '/api/subject/' + subject_id, {
      headers: {
        Authentication: 'Bearer ' + token,
      },
      responseType: 'text'
    });
  }
}
