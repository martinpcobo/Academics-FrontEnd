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
        'Authentication': 'Bearer ' + token,
      }
    });
  }
}
