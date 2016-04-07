import {Component} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginComponent} from './login.component';
import {UserComponent} from './user.component';

import {User} from '../models/User';

@Component({
  selector: 'go-web-app',
  directives: [RouterLink, RouterOutlet, ROUTER_DIRECTIVES, UserComponent, LoginComponent],
  templateUrl: 'dev/templates/app.html'
})

@RouteConfig([
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/users/:id', name: 'User', component: UserComponent }
])

export class AppComponent {
  public currentUser: User;
}
