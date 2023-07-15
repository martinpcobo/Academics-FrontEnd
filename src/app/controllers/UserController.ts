import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import User from "../../models/User";

@Injectable()
export default class UserController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructor
  public constructor(private http: HttpClient) {
  }

  // ! User Requests
  // * Get a user by id
  public getUserById(user_id: String, token: String | null): Observable<User> {
    return this.http.get<User>(this.server_url + '/api/user/' + user_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * Get all Users
  public getUsersList(token: String | null): Observable<User[]> {
    return this.http.get<User[]>(this.server_url + '/api/user/', {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }

  // * [USER] Modify an existing user

  public modifyUserSecure(user: User, token: String | null): Observable<String> {
    return this.http.put(this.server_url + '/api/user/' + user.getIdentifier(), user, {
      headers: {
        'Authentication': 'Bearer ' + token,
      },
      responseType: 'text'
    });
  }

  // * [ADMIN] Modify an existing user

  public modifyUser(user: User, token: String | null): Observable<String> {
    return this.http.put(this.server_url + '/api/user/' + user.getIdentifier() + '/admin', user, {
      headers: {
        'Authentication': 'Bearer ' + token,
      },
      responseType: 'text'
    });
  }

  // * Delete user
  public deleteUser(user_id: String, token: String | null): Observable<String> {
    return this.http.delete(this.server_url + '/api/user/' + user_id, {
      headers: {
        'Authentication': 'Bearer ' + token,
      },
      responseType: 'text'
    });
  }

  // * Create user
  public createUser(user: User, password: String, token: String | null): Observable<User> {
    return this.http.post<User>(this.server_url + '/api/user/', {
      ...user,
      credential: {
        password: password
      }
    }, {
      headers: {
        'Authentication': 'Bearer ' + token,
      }
    });
  }
}
