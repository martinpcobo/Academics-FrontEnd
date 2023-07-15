import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Class} from "../../../../models/Class";

@Injectable()
export class ClassController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructors
  constructor(private http: HttpClient) {
  }

  // ! Endpoints

  // * Get all Classes
  public getAllClasses(token: String | null): Observable<Class[]> {
    return this.http.get<Class[]>(this.server_url + '/api/class/', {
      headers: {
        'Authentication': 'Bearer ' + token
      },
      observe: 'body'
    });
  }

  // * Get a Class by Id
  public getClassById(class_id: String, token: String | null): Observable<Object> {
    return this.http.get<Object>(this.server_url + '/api/class/' + class_id, {
      headers: {
        'Authentication': 'Bearer ' + token
      }
    });
  }

  // * Get Clases from Student
  public getClassesFromStudent(student_id: String, token: String | null): Observable<Class[]> {
    return this.http.get<Class[]>(this.server_url + '/api/class/student/' + student_id, {
      headers: {
        'Authentication': 'Bearer ' + token
      }
    });
  }

  // * Create a Class
  public createClass(class_instance: Class, token: String | null): Observable<Class> {
    return this.http.post<Class>(this.server_url + '/api/class/', class_instance, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Delete a Class
  public deleteClass(class_id: String, token: String | null): Observable<String> {
    return this.http.delete(this.server_url + '/api/class/' + class_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      },
      responseType: 'text'
    });
  }

  // * Modify a Class
  public modifyClass(class_instance: Class, token: String | null): Observable<Class> {
    return this.http.put<Class>(this.server_url + '/api/class/', class_instance, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Alter a Class' Professors
  public alterClassProfessors(class_id: String, professor_ids: String[], token: String | null): Observable<Class> {
    return this.http.put<Class>(this.server_url + '/api/class/' + class_id + '/professors', professor_ids, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Alter a Class' Students
  public alterClassStudents(class_id: String, student_ids: String[], token: String | null): Observable<Class> {
    return this.http.put<Class>(this.server_url + '/api/class/' + class_id + '/students', student_ids, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }
}
