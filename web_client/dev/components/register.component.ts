import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response} from "angular2/http";
import {UserService} from '../services/user.service';
import {LoadingComponent} from "./loading.component";
import {ToastyService, Toasty} from 'ng2-toasty';

import {NgForm} from 'angular2/common';
import {User} from '../models/User';

import {CallbackHttpComponent} from "./callback.component";

@Component({
  selector: 'go-register',
  templateUrl: 'dev/templates/register.html',
  directives: [LoadingComponent, Toasty]
})

export class RegisterComponent extends CallbackHttpComponent {
  email: string;
  password: string;
  password_confirmation: string;
  checkMe: boolean;
  active: boolean;
  noPasswordMatch: boolean;

  constructor(private userService: UserService, private router: Router, private toastyService: ToastyService) {
    super();
    this.active = true;
    this.checkMe = false;
    this.noPasswordMatch = false;
    this.userService.stop();
  }

  onSubmit(): void {
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
    this.userService.start();
    this.userService.register(email, password)
    .subscribe(
      (data) => this.handleResponse(data),
      (err) => this.handleResponse(err)
     );
  }

  public onSucess(res: Response): void {
    if (this.userService.loggedIn) {
      this.active = true;
      this.userService.stop();
      this.router.navigate(['User', 'UserDashboard']);
      this.toastyService.success({ title: "Welcome", msg: this.userService.currentUser().username, timeout: 6000 });
    }
  }

  public onError(res: Response): void {
    this.active = true;
    this.userService.stop();
    this.toastyService.error({ title: "Unexpected error", msg: "User already registered", timeout: 6000 });
  }
}
