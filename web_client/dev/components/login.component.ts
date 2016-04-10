import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserService} from '../services/user.service';
import {LoadingComponent} from "./loading.component";
import {Response} from "angular2/http";
import {ToastyService, Toasty} from 'ng2-toasty';

import {NgForm} from 'angular2/common';
import {User} from '../models/User';

import {CallbackHttpComponent} from "./callback.component";

@Component({
  selector: 'go-login',
  templateUrl: 'dev/templates/login.html',
  directives: [LoadingComponent, Toasty]
})

export class LoginComponent extends CallbackHttpComponent {
  email: string;
  password: string;
  checkMe: boolean;
  active: boolean;

  constructor(private userService: UserService, private router: Router, private toastyService: ToastyService) {
    super();
    this.active = true;
    this.checkMe = false;
  }

  public onSubmit(): void {
    let email = this.email;
    let password = this.password;
    this.active = false;
    this.userService.loginWithCredentials(email, password)
    .subscribe(
      (data) => this.handleResponse(data),
      (err) => this.handleResponse(err)
     );
  }

  public onSucess(res: Response): void {
    this.active = true;
    this.router.navigate(['User', 'UserDashboard']);
    this.toastyService.success({ title: "Welcome", msg: this.userService.currentUser().username, timeout: 6000 });
  }

  public onError(res: Response): void {
    this.active = true;
    this.toastyService.error({ title: "Invalid combination of Email and Password", timeout: 6000 });
  }

  public authWithProvider(provider: string) {
    this.userService.loginWithProvider(provider);
  }
}
