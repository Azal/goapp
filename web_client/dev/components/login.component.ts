import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserService} from '../services/user.service';
import {LoadingComponent} from "./loading.component";

import {NgForm} from 'angular2/common';
import {User} from '../models/User';

@Component({
  selector: 'go-login',
  templateUrl: 'dev/templates/login.html',
  directives: [LoadingComponent]
})

export class LoginComponent {
  email: string;
  password: string;
  checkMe: boolean;
  active: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.active = true;
    this.checkMe = false;
  }

  public onSubmit(): void {
    let email = this.email;
    let password = this.password;
    this.active = false;

    this.userService.loginWithCredentials(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['User']);
      }
      this.active = true;
    });
  }
}
