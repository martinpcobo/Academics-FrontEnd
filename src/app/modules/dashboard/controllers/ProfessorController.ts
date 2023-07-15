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

  // * Create Professor Profile
  public createProfessorProfile(user_id: String, token: String | null): Observable<Professor> {
    return this.http.post<Professor>(this.server_url + '/api/professor/' + user_id, {}, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Delete Professor Profile
  public deleteProfessorProfile(professor_id: String, token: String | null): Observable<String> {
    return this.http.delete(this.server_url + '/api/professor/' + professor_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      },
      responseType: 'text'
    });
  }

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
