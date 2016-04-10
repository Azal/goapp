export class User {
  private _id: number;
  private _email: string;
  private _password: string;
  private _nickname: string;
  private _confirm_password: string;

  constructor() {
    this._password = "";
  }

  /*
    PASSWORD
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
  public set password(value: string) {
    this._password = value;
  }


  /* EMAIL */
  public get email() : string {
    return this._email;
  }
  public set email(v : string) {
    this._email = v;
  }
}
