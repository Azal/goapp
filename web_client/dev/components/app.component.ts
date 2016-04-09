import {Component} from 'angular2/core';
import {RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {UserComponent} from './user.component';
import {RegisterComponent} from './register.component';

import {User} from '../models/User';

@Component({
  selector: 'go-web-app',
  directives: [RouterLink, RouterOutlet, ROUTER_DIRECTIVES],
  templateUrl: 'dev/templates/app.html'
})

@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/register', name: 'Register', component: RegisterComponent },
  { path: '/user/...', name: 'User', component: UserComponent }
])

export class AppComponent {

}
