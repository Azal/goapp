import {Component} from 'angular2/core';
import {RouteConfig, Router, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {LocalStorage} from "../helpers/localstorage";
import {Response} from "angular2/http";

import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {UserComponent} from './user.component';
import {RegisterComponent} from './register.component';
import {LoadingComponent} from "./loading.component";
import {ToastyService, ToastyConfig, Toasty, ToastOptions, ToastData} from 'ng2-toasty';

import {UserService} from '../services/user.service';
import {User} from '../models/User';

@Component({
  selector: 'go-web-app',
  directives: [RouterLink, RouterOutlet, ROUTER_DIRECTIVES, LoadingComponent, Toasty],
  templateUrl: 'dev/templates/app.html'
})

@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/register', name: 'Register', component: RegisterComponent },
  { path: '/user/...', name: 'User', component: UserComponent }
])

export class AppComponent {
  constructor(private userService: UserService, private router: Router, private toastyService: ToastyService) {
    if (window.location.pathname.match(/\/auth\/\w+\/callback/)) {
      this.userService.start();

      userService.providerCallback(window.location)
      .subscribe(
        (res) => this.handleProviderRegister(res),
        (err) => this.handleProviderRegister(err)
      );
    } else {
      this.userService.stop();
    }
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['Home']);
  }

  public handleProviderRegister(res: Response) {
    if (!this.userService.handleProviderLogin(res)) {
      this.toastyService.error({ title: "Unexpected error", msg: "Cannot login with " + this.userService.provider, timeout: 6000 });
    } else {
      this.toastyService.success({ title: "Welcome", msg: this.userService.currentUser().username, timeout: 6000 });
    }
    this.userService.stop();
  }
}
