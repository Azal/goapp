import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response} from "angular2/http";
import {UserService} from '../services/user.service';
import {LoadingComponent} from "./loading.component";

import {NgForm} from 'angular2/common';
import {User} from '../models/User';

import {CallbackHttpComponent} from "./callback.component";

@Component({
  selector: 'go-register',
  templateUrl: 'dev/templates/register.html',
  directives: [LoadingComponent]
})

export class RegisterComponent extends CallbackHttpComponent {
  showErrors: boolean;
  email: string;
  password: string;
  password_confirmation: string;
  checkMe: boolean;
  active: boolean;
  noPasswordMatch: boolean;
  lastServerError: string;

  constructor(private userService: UserService, private router: Router) {
    super();
    this.active = true;
    this.checkMe = false;
    this.showErrors = false;
    this.noPasswordMatch = false;
  }

  onSubmit(): void {
    this.showErrors = false;
    this.lastServerError = "";

    let email = this.email;
    let password = this.password;
    let confirmation = this.password_confirmation;

    if (password !== confirmation) {
      this.noPasswordMatch = true;
      return;
    } else {
      this.noPasswordMatch = false;
    }

    this.active = false;
    this.userService.register(email, password)
    .subscribe(
      (data) => this.handleResponse(data),
      (err) => this.handleResponse(err)
     );
  }

  public onSucess(res: Response): void {
    if (this.userService.loggedIn) {
      this.showErrors = false;
      this.active = true;
      this.router.navigate(['User', 'UserDashboard']);
    }
  }

  public onError(res: Response): void {
    this.lastServerError = res.json();
    this.showErrors = true;
    this.active = true;
  }
}
