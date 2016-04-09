import {Component} from 'angular2/core';

@Component({
  selector: 'user-dashboard',
  template: `
    {{currentUser.email}} Dashboard
  `
})

export class UserDashboard {

}
