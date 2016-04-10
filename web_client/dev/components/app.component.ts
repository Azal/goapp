import {Component} from 'angular2/core';
import {RouteConfig, Router, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {LocalStorage} from "../helpers/localstorage";

import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {UserComponent} from './user.component';
import {RegisterComponent} from './register.component';
import {LoadingComponent} from "./loading.component";

import {UserService} from '../services/user.service';
import {User} from '../models/User';

@Component({
  selector: 'go-web-app',
  directives: [RouterLink, RouterOutlet, ROUTER_DIRECTIVES, LoadingComponent],
  templateUrl: 'dev/templates/app.html'
})

@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/register', name: 'Register', component: RegisterComponent },
  { path: '/user/...', name: 'User', component: UserComponent }
])

export class AppComponent {
  isRunning: true;

  constructor(private userService: UserService, private router: Router) {
    if (window.location.pathname.match(/\/auth\/\w+\/callback/)) {
      this.isRunning = true;
      userService.providerCallback(window.location)
      .subscribe(
        (res) => this.handleProviderRegister(res),
        (err) => this.handleProviderRegister(err)
      );
    }
    this.isRunning = false;
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['Home']);
  }

  public handleProviderRegister(res: Response) {
    this.isRunning = false;
    this.userService.handleProviderLogin(res);
  }
}
