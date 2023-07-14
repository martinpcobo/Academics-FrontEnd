import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Authenticator from "../../models/Authenticator";

@Injectable()
export default class AuthenticatorController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructor
  public constructor(private http: HttpClient) {
  }

  // ! Authenticator Routes
  // * Get User's Authenticators
  public getAuthenticatorsFromUser(user_id: String, token: String): Observable<Authenticator[]> {
    return this.http.get<Authenticator[]>(this.server_url + '/api/auth/authenticator/' + user_id, {
      headers: {
        'Authentication': 'Bearer ' + token
      }
    });
  }

  // * Get Authenticator by ID
  public getAuthenticatorById(authenticator_id: String, user_id: String, token: String): Observable<Authenticator> {
    return this.http.get<Authenticator>(this.server_url + '/api/auth/authenticator/' + user_id + '/' + authenticator_id, {
      headers: {
        'Authentication': 'Bearer ' + token
      }
    });
  }

  // * Get Autheticator Count
  public getAuthenticatorCountByUsername(username: String): Observable<Number> {
    return this.http.get<Number>(this.server_url + '/api/auth/authenticator/' + username + '/count', {
      responseType: undefined,
    });
  }

  // * Modify the Name of an Authenticator
  public modifyAuthenticatorName(authenticator_id: String, user_id: String, name: String, token: String): Observable<any> {
    return this.http.put(this.server_url + '/api/auth/authenticator/' + user_id + '/' + authenticator_id, name, {
      responseType: "text",
      observe: "body",
      headers: {
        'Authentication': 'Bearer ' + token
      }
    });
  }

  // * Remove an Authenticator from a User
  public removeAuthenticator(authenticator_id: String, user_id: String, token: String): Observable<any> {
    return this.http.delete(this.server_url + '/api/auth/authenticator/' + user_id + '/' + authenticator_id, {
      responseType: "text",
      headers: {
        'Authentication': 'Bearer ' + token
      }
    });
  }
}
