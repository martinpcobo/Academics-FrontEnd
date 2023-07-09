import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Professor} from "../../../../models/Professor";

@Injectable()
export class ProfessorController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructors
  constructor(private http: HttpClient) {
  }

  // ! Endpoints

  // * Get all Professors
  public getAllProfessors(token: String | null): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.server_url + '/api/professor/', {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Get a Professor
  public getProfessor(professor_id: String, token: String | null): Observable<Professor> {
    return this.http.get<Professor>(this.server_url + '/api/professor/' + professor_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }
}
