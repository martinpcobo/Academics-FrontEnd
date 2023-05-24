import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import AuthLoginDetails from "../models/dtos/AuthLoginDetails";
import {Observable} from "rxjs";

@Injectable()
export default class UserController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructor
  public constructor(private http: HttpClient) {
  }

  // ! User Requests

  // * User Exists
  public getUserByVerifiedEmail(credentials: AuthLoginDetails): Observable<String | null> {
    return this.http.get(this.server_url + '/api/user/' + credentials.getUsername() + '/id', {responseType: "text"});
  }

}
