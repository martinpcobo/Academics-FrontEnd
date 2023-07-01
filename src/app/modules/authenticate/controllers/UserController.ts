import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export default class UserController {
  // ! Attributes
  private server_url: String = 'http://localhost:8080';

  // ! Constructor
  public constructor(private http: HttpClient) {
  }

  // ! User Requests

}
