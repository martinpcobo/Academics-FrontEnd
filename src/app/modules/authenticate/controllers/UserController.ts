import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import User from "../../../models/User";

@Injectable()
export default class UserController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructor
  public constructor(private http: HttpClient) {
  }

  // ! User Requests
  public getUserInformation(user_id: String, token: String): Observable<User> {
    return this.http.get<User>(this.server_url + '/api/user/' + user_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }
}
