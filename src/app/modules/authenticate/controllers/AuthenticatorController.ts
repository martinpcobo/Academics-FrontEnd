import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Authenticator from "../../../models/Authenticator";

@Injectable()
export default class AuthenticatorController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructor
  public constructor(private http: HttpClient) {
  }

  // ! Authenticator Routes
  // * Get User's Authenticators
  public getAuthenticatorsFromUser(user_id: String): Observable<Authenticator[]> {
    return this.http.get<Authenticator[]>(this.server_url + '/api/auth/authenticator/' + user_id);
  }

  // * Get Authenticator by ID
  public getAuthenticatorById(authenticator_id: String, user_id: String): Observable<Authenticator> {
    return this.http.get<Authenticator>(this.server_url + '/api/auth/authenticator/' + user_id + '/' + authenticator_id);
  }

  // * Get Autheticator Count
  public getAuthenticatorCountByUsername(username: String): Observable<Number> {
    return this.http.get<Number>(this.server_url + '/api/auth/authenticator/' + username + '/count', {
      responseType: undefined
    });
  }

  // * Modify the Name of an Authenticator
  public modifyAuthenticatorName(authenticator_id: String, user_id: String, name: String): Observable<Authenticator> {
    return this.http.put<Authenticator>(this.server_url + '/api/auth/authenticator/' + user_id + '/' + authenticator_id, {new_authenticator_name: name});
  }

  // * Remove an Authenticator from a User
  public removeAuthenticator(authenticator_id: String, user_id: String): Observable<Authenticator> {
    return this.http.delete<Authenticator>(this.server_url + '/api/auth/authenticator/' + user_id + '/' + authenticator_id);
  }
}
