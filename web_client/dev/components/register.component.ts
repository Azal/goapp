import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserService} from '../services/user.service';

import {NgForm} from 'angular2/common';
import {User} from '../models/User';

@Component({
  selector: 'go-register',
  templateUrl: 'dev/templates/login.html'
})

export class RegisterComponent {
  user: User = new User();
  checkMe: string;
  active: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.active = false;
    let email = this.user.email;
    let password = this.user.password;

    this.userService.register(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['User']);
      }
      this.active = false;
    });
  }
}
