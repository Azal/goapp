import {Injectable} from 'angular2/core';
import {User} from '../models/User';
import {ServicesInterface} from '../interfaces/ServicesInterface';

export var USERS: User[] = [
    {"id": 11, email: "aimmanager.com@example.com", "nickname": "Mr. Nice"},
    {"id": 12, email: "aimmanager.com@example.com", "nickname": "Narco"},
    {"id": 13, email: "aimmanager.com@example.com", "nickname": "Bombasto"},
    {"id": 14, email: "aimmanager.com@example.com", "nickname": "Celeritas"},
    {"id": 15, email: "aimmanager.com@example.com", "nickname": "Magneta"},
    {"id": 16, email: "aimmanager.com@example.com", "nickname": "RubberMan"},
    {"id": 17, email: "aimmanager.com@example.com", "nickname": "Dynama"},
    {"id": 18, email: "aimmanager.com@example.com", "nickname": "Dr IQ"},
    {"id": 19, email: "aimmanager.com@example.com", "nickname": "Magma"},
    {"id": 20, email: "aimmanager.com@example.com", "nickname": "Tornado"}
];

@Injectable()
export class UserService implements ServicesInterface<User> {
  index() {
    return USERS;
  }
}
