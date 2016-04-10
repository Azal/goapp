import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response} from "angular2/http";
import {UserService} from '../services/user.service';

import {NgForm} from 'angular2/common';
import {User} from '../models/User';

import {CallbackHttpComponent} from "./callback.component";

@Component({
  selector: 'go-register',
  templateUrl: 'dev/templates/login.html'
})

export class RegisterComponent extends CallbackHttpComponent {
  user: User = new User();
  checkMe: boolean;
  active: boolean = true;

  constructor(private userService: UserService, private router: Router) {
    super();
    this.active = true;
    this.checkMe = false;
  }

  onSubmit(): void {
    this.active = false;
    let email = this.user.email;
    let password = this.user.password;

    this.userService.register(email, password)
    .subscribe(
      (data) => this.handleResponse(data),
      (err) => this.handleResponse(err)
     );
  }

  public onSucess(res: Response): void {
    this.active = true;
    this.router.navigate(['User', 'UserDashboard']);
  }

  public onError(res: Response): void {
    this.active = false;
  }
}
