import {Component} from "angular2/core";
import {BoardComponent} from "./BoardComponent";
import {SequenceTreeComponent} from "./SequenceTreeComponent";

@Component({
  selector: "go-editor",
  template: `
    <go-sequence-tree></go-sequence-tree>
  `,
  directives: [BoardComponent, SequenceTreeComponent]
})

export class AppComponent {
}
