import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  template: `HOME`
})

export class HomeComponent {
  active: boolean = false;

  constructor() {
    this.active = true;
  }
}
