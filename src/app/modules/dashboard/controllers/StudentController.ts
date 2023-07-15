import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Student} from "../../../../models/Student";

@Injectable()
export class StudentController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructors
  constructor(private http: HttpClient) {
  }

  // ! Endpoints

  // * Create Student Profile
  public createStudentProfile(user_id: String, token: String | null): Observable<Student> {
    return this.http.post<Student>(this.server_url + '/api/student/' + user_id, {}, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Delete Student Profile
  public deleteStudentProfile(user_id: String, token: String | null): Observable<String> {
    return this.http.delete(this.server_url + '/api/student/' + user_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      },
      responseType: 'text',
    });
  }

  // * Get all Students
  public getAllStudents(token: String | null): Observable<Student[]> {
    return this.http.get<Student[]>(this.server_url + '/api/student/', {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Subscribe a Student
  public subscribeStudent(user_id: String, token: String | null): Observable<Student> {
    return this.http.post<Student>(this.server_url + '/api/Student/' + user_id, {}, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Unsubscribe a Student
  public unsubscribeStudent(user_id: String, token: String | null): Observable<String> {
    return this.http.delete(this.server_url + '/api/student/' + user_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      },
      responseType: 'text',
    });
  }

  // * Get a Student
  public getStudent(student_id: String, token: String | null): Observable<Student> {
    return this.http.get<Student>(this.server_url + '/api/student/' + student_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }
}
