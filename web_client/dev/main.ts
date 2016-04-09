//main entry point
import {AppComponent} from "./components/app.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {bootstrap} from "angular2/platform/browser";
import {provide, ComponentRef} from "angular2/core";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {UserService} from "./services/user.service";
import {appInjector} from "./app.injector";
import "rxjs/Rx";

bootstrap(AppComponent, [
  UserService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]).then((appRef: ComponentRef) => {
  // store a reference to the application injector
  appInjector(appRef.injector);
});
