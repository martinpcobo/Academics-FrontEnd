import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import AuthLoginDetails from "../../models/dtos/AuthLoginDetails";
import User from "../../models/User";

@Injectable()
export default class AuthenticationController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructor
  public constructor(private http: HttpClient) {
  }

  // ! Traditional AuthenticationService Requests
  // * Login using Username and Password
  public authenticatePassword(credentials: AuthLoginDetails): Observable<String> {
    return this.http.post(this.server_url + '/api/auth/login', credentials, {
      responseType: 'text',
    });
  }

  public changePassword(user_id: String, old_password: String, new_password: String, token: String): Observable<User> {
    return this.http.put<User>(this.server_url + '/api/user/' + user_id + '/password', {
      oldPassword: old_password,
      newPassword: new_password
    }, {
      headers: {
        'Authentication': 'Bearer ' + token
      }
    });
  }

  // ! WebAuthn AuthenticationService Requests
  // * Start Authn AuthenticationService Registration
  public startAuthnRegistration(credentials: AuthLoginDetails): Observable<String> {
    return this.http.post<String>(this.server_url + '/api/auth/webauthn/register/start', credentials, {
      responseType: "json",
      observe: "body"
    });
  }

  // * End Authn AuthenticationService Registration
  public endAuthnRegistration(credentials: AuthLoginDetails): Observable<String> {
    return this.http.post(this.server_url + '/api/auth/webauthn/register/end', credentials, {
      responseType: 'text',
    });
  }

  // * Start Authn AuthenticationService Login
  public startAuthnLogin(credentials: AuthLoginDetails): Observable<WebAuthnLoginResponse> {
    return this.http.post<WebAuthnLoginResponse>(this.server_url + '/api/auth/webauthn/login/start', credentials);
  }

  // * End Authn AuthenticationService Login
  public endAuthnLogin(credentials: AuthLoginDetails): Observable<String> {
    return this.http.post(this.server_url + '/api/auth/webauthn/login/end',
      {
        username: credentials.getUsername(),
        publicKey: credentials.getPublicKey()
      },
      {
        responseType: 'text'
      });
  }
}

export interface WebAuthnLoginResponse {
  publicKey: any;
};
