import {Component} from "angular2/core";
import {BoardComponent} from "./board.component";
import {SequenceTreeComponent} from "./sequencetree.component";

@Component({
  selector: "go-editor",
  template: `
    <go-board></go-board>
    <go-sequence-tree></go-sequence-tree>
  `,
  directives: [BoardComponent, SequenceTreeComponent]
})

export class AppComponent {
}
