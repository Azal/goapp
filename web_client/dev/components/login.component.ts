import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {User} from '../models/User';

@Component({
  selector: 'go-login',
  templateUrl: 'dev/templates/login.html'
})

export class LoginComponent {
  user: User = new User();
  checkMe: string;
  active: boolean = true;

  onSubmit(): void {
    this.active = false;


    this.active = true;
  }
}
