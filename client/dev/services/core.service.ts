import {Http, Headers} from "angular2/http";
import {LocalStorage} from "../helpers/localstorage";

export class CoreService {
  public baseServer: string = "http://goeditor.lvh.me:1337";
  protected localStorage: LocalStorage;
  protected jsonHeaders: Headers;

  constructor(protected http: Http) {
    this.localStorage = new LocalStorage();
    this.jsonHeaders = new Headers();
    this.jsonHeaders.append('Content-Type', 'application/json');
  }

  public resourceUrl(resource: string): string {
    return this.baseServer + "/" + resource;
  }

}
