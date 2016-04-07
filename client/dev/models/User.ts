export class User {
  public id: number;
  public email: string;
  public nickname: string;
  public confirm_password: string;
  private _password: string;

  constructor() {
    this._password = "";
  }

  public set password(value: string) {
    this._password = value;
  }

  /*
    Returns filtered password
  */
  public get password(): string {
    let i: number = 0;
    let str: string = "";
    while(i < this._password.length) {
      i = i +1;
      str = str + "*"
    }
    return str;
  }
}
