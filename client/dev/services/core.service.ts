import {Http, Headers} from "angular2/http";
import {LocalStorage} from "../helpers/localstorage";

export class CoreService {
  public baseServer: string = "http://localhost:1337";
  protected localStorage: LocalStorage;

  constructor(protected http: Http) {
    this.localStorage = new LocalStorage();
  }

  public resourceUrl(resource: string): string {
    return this.baseServer + "/" + resource;
  }

}
