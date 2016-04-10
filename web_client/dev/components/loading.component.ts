import {Component, Input, OnDestroy} from "angular2/core";

@Component({
  selector: 'loading',
  template: `
    <div class="spinner" [hidden]="!isDelayedRunning">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    </div>
  `
})

export class LoadingComponent implements OnDestroy {
  private currentTimeout: number;
  private isDelayedRunning: boolean = false;

  @Input()
  public delay: number = 300;

  @Input()
  public set isRunning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isDelayedRunning = false;
      return;
    }

    if (this.currentTimeout) {
      return;
    }

    this.currentTimeout = setTimeout(() => {
      this.isDelayedRunning = value;
      this.cancelTimeout();
    }, this.delay);

    return;
  }

  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }
}
