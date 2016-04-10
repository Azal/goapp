import {Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

export class CallbackHttpComponent {
  showErrors: boolean;

  public onSucess(res: Response): void {
    this.showErrors = false;
    console.error(res);
  }

  public onError(res: Response): void {
    this.showErrors = true;
    console.error(res);
  }

  public handleResponse(res: Response) {
    if (res.status === 200) {
      return this.onSucess(res);
    } else {
      return this.onError(res);
    }
  }
}
