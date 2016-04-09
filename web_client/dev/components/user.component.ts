import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction} from 'angular2/router';
import {isLoggedIn} from '../isloggedin';

import {User} from '../models/User';
import {UserDashboard} from './user/user.dashboard.component';

@Component({
  selector: 'user',
  templateUrl: 'dev/templates/user.html',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/', component: UserDashboard, name: 'UserDashboard'}
])

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})

export class UserComponent {
  currentUser: User = new User();
}
