import {Injectable} from "angular2/core";
import {Http, Headers, Response, URLSearchParams} from "angular2/http";
import {CoreService} from "./core.service";
import {Observable} from "rxjs/Observable";
import {LocalStorage} from "../helpers/localstorage";

@Injectable()
export class UserService extends CoreService {
  private loggedIn = false;
  public userData: Object;

  constructor(protected http: Http) {
    super(http);
    this.loggedIn = this.localStorage.getItem('auth_token') || this.localStorage.getItem('user');
  }

  login() {
    this.loggedIn = true;
  }

  loginWithCredentials(email: string, password: string) {
    let route = this.resourceUrl("auth/local");
    let data = JSON.stringify({ identifier: email, password: password });

    return this.http
      .post(route, data, { headers: this.jsonHeaders })
      .map((res: any) => {
        let user = res.json();

        if (res.status === 200) {
          this.localStorage.setItem('auth_token', user.token);
          this.localStorage.setItem('user', user);
          this.loggedIn = true;
        }
        return res;
      });
  }

  register(email: string, password: string) {
    let route = this.resourceUrl("register");
    let username: string = email.split("@")[0];
    let data = JSON.stringify({ username: username, email: email, password: password });

    return this.http
      .post(route, data, { headers: this.jsonHeaders })
      .map((res: any) => {
        let user = res.json();

        if (res.status === 200) {
          this.localStorage.setItem('auth_token', user.token);
          this.localStorage.setItem('user', user);
          this.loggedIn = true;
        }
        return res;
      })
  }

  logout(): void {
    let route = this.resourceUrl("logout");
    let user = this.localStorage.getItem("user");
    let params: URLSearchParams = new URLSearchParams();
    params.set('identifier', user.email);
    params.set('email', user.email);

    this.http.get(route, { headers: this.jsonHeaders })
      .subscribe(
        (res) => this.handleLogout(res),
        (err) => this.handleLogout(err)
      );
    return;
  }

  private handleLogout(res: Response) {
    if (res.status === 200 || res.status === 302) {
      this.localStorage.removeItem('auth_token');
      this.localStorage.removeItem('user');
      this.loggedIn = false;
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  check() {
    return Observable.of(this.loggedIn);
  }

  currentUser() {
    return this.localStorage.getItem('user');
  }
}