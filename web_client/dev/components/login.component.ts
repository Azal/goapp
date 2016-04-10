import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserService} from '../services/user.service';
import {LoadingComponent} from "./loading.component";
import {Response} from "angular2/http";

import {NgForm} from 'angular2/common';
import {User} from '../models/User';

import {CallbackHttpComponent} from "./callback.component";

@Component({
  selector: 'go-login',
  templateUrl: 'dev/templates/login.html',
  directives: [LoadingComponent]
})

export class LoginComponent extends CallbackHttpComponent {
  showErrors: boolean;
  email: string;
  password: string;
  checkMe: boolean;
  active: boolean;

  constructor(private userService: UserService, private router: Router) {
    super();
    this.active = true;
    this.checkMe = false;
    this.showErrors = false;
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
    this.showErrors = false;
    this.active = true;
    this.router.navigate(['User', 'UserDashboard']);
  }

  public onError(res: Response): void {
    this.showErrors = true;
    this.active = true;
  }

  public authWithProvider(provider: string) {
    this.userService.loginWithProvider(provider);
  }
}
