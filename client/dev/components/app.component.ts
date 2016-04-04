import {Component} from 'angular2/core';
import {BoardComponent} from './board.component';

@Component({
  selector: 'go-editor',
  template: `
    <go-board></go-board>
  `,
  directives: [BoardComponent]
})

export class AppComponent {
  
}
