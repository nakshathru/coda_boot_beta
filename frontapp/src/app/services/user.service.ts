import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { RestService } from "./rest.service";
import { User } from '../models/user';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(public http: HttpClient, private restClient: RestService) {}
  public userSource = new BehaviorSubject({});
  public userStatus = new BehaviorSubject("false");
  currentUsers = this.userSource.asObservable();
  currentStatus = this.userStatus.asObservable();

  listUsers() {
    return new Promise((resolve, reject) => {
      this.restClient.get({ hasAuth: true, url: "users/" }).subscribe(
          data => {
          resolve(data);
          this.userSource.next(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  signIn(name, password) {
    console.log(name, password);

    return new Promise((resolve, reject) => {
      this.restClient
        .post({
          hasAuth: false,
          url: "auth/signin/",
          payload: { username: name, password }
        })
        .subscribe(
          data => {
            resolve(data);
            console.log(data);
          },
          err => {
            console.log(err);

            reject(err);
          }
        );
    });
  }
  getUserStatus() {
    return new Promise((resolve, reject) => {
      this.restClient.post({ hasAuth: true, url: "users/verify" }).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  insertUser(name, phone, location) {
    const user = {
      name,
      phone,
      location
    };
    return new Promise((resolve, reject) => {
      this.restClient
        .post({ hasAuth: true, url: "users/", payload: user })
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  editUser(name, phone, location, id) {
    const user = {
      name,
      phone,
      location
    };
    return new Promise((resolve, reject) => {
      this.restClient
        .put({ hasAuth: true, url: "users/" + id, payload: user })
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.restClient.delete({ hasAuth: true, url: "users/" + id }).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  getToken() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.token;
  }
  signupUser(body) {
    return new Promise((resolve, reject) => {
      this.restClient
        .post({ hasAuth: false, url: "auth/signup/", payload: body })
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
