import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Subject} from "../../../../models/Subject";
import {HttpClient} from "@angular/common/http";
import {Grade} from "../../../../models/Grade";

@Injectable()
export class GradeController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080/api/grade';

  // ! Constructors
  constructor(private http: HttpClient) {
  }

  // ! Endpoints

  // * Get Grades from Course
  public getGradesFromCourse(course_id: String, token: String | null): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.server_url + '/course/' + course_id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  // * Get Grade by Id
  public getGradeById(grade_id: String, token: String | null): Observable<Grade> {
    return this.http.get<Grade>(this.server_url + '/' + grade_id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  // * Get Grades from Student
  public getGradesFromStudent(student_id: String, token: String | null): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.server_url + '/student/' + student_id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  // * Create Grade
  public createGrade(grade: Grade, token: String | null): Observable<Grade> {
    return this.http.post<Grade>(this.server_url + '/', grade, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }

  // * Delete Grade
  public deleteGradeById(grade_id: String, token: String | null): Observable<String> {
    return this.http.delete(this.server_url + '/' + grade_id, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      responseType: 'text'
    });
  }

}
