import {Component} from 'angular2/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'user-dashboard',
  templateUrl: "dev/templates/user/dashboard.html"
})

export class UserDashboard {
  constructor(private userService: UserService) {
  }
}
