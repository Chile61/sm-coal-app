import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';
import { Helper } from '../../common/services/helper.service';

@Injectable()
export class UserService {
  headers: Headers;
  requestOptions: RequestOptions;

  userUpdateAvatarAPI: string = this.helper.getAPP('imageUtil/uploadImage');


  //
  // constructor
  constructor(
    public events: Events,
    private http: Http,
    private helper: Helper
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers, withCredentials: true});
  }


  //
  // get user
  getUser(): Promise<User> {
    let api: string = this.helper.getAPP('user/my-info');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => response.json());
  }


  //
  // update
  update(params): Promise<User> {
    let api: string = this.helper.getAPP('user/update');

    return this.http.post(api, params, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // sign up
  signUp(params): Promise<User> {
    let api: string = this.helper.getAPP('login/login');
    let data: Object = params;

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // get verification code
  getVerificationCode(params) {
    let api: string = this.helper.getAPP('login/getVerifyCode');
    let data: Object = params;

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // log in
  logIn(params): Promise<User> {
    let api: string = this.helper.getAPI('user/log-in');
    let data: Object = params;

    console.log(api, data);

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // log in with wechat
  logInWithWechat(params): Promise<User> {
    let api: string = this.helper.getAPI('user/log-in-with-wechat');
    let data: Object = params;

    console.log(api, data);

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // log out
  logOut(): Promise<User> {
    let api: string = this.helper.getAPP('login/testCookie');

    return this.http.post(api, null, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  feedback(params) {
    let api: string = this.helper.getAPP('user/feedback');

    return this.http.post(api, params, this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  checkUpdate(params) {
    let api: string = this.helper.getAPP('version/checkNewVersion');

    return this.http.post(api, params, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  // handle error
  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
