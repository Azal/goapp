import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {LocalStorage} from "../helpers/localstorage";
import {CoreService} from "./core.service";

@Injectable()
export class UserService extends CoreService {
  private loggedIn = false;

  constructor(protected http: Http) {
    super(http);
    this.loggedIn = !!this.localStorage.getItem('auth_token');
  }

  login() {
    this.loggedIn = true;
  }

  loginWithCredentials(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let route = this.resourceUrl("login");

    return this.http
      .post(
        route,
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this.localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }

  register(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let route = this.resourceUrl("user");

    return this.http
      .post(
        route,
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this.localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }

  logout(): void {
    this.localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  check() {
    return Observable.of(this.loggedIn);
  }
}