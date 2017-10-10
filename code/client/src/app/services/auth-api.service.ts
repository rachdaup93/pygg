import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { SignupInfo } from '../interfaces/signup-info';
import { LoginInfo } from '../interfaces/login-info';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthApiService {

  baseUrl: string = environment.apiUrl;

  // the thing that receives the changes
  loginStatusSubject = new BehaviorSubject<any>({ isLoggedIn: false });

  // the thing that broadcasts the changes
  loginStatusNotifier = this.loginStatusSubject.asObservable();


  constructor(
    private httpThang: HttpClient
  ) { }

  // POST /api/process-signup
  postSignup(userInfo: SignupInfo) {
      return (
        this.httpThang.post(
            this.baseUrl + '/api/process-signup',
            userInfo,
            { withCredentials: true }
        ) // need "withCredentials" for APIs that use the session
        .do((userInfo) => {
            this.loginStatusSubject.next({
                isLoggedIn: true,
                userInfo: userInfo
            });
        })
      ); // return (
  } // postSignup()

  // GET /api/checklogin
  getLoginStatus() {
      return (
        this.httpThang.get(
            this.baseUrl + '/api/checklogin',
            { withCredentials: true }
        ) // need "withCredentials" for APIs that use the session
        .do((loggedInInfo) => {
            this.loginStatusSubject.next(loggedInInfo);
        })
      ); // return (
  } // getLoginStatus()

  // POST /api/process-login
  postLogin(loginCredentials: LoginInfo) {
      return (
        this.httpThang.post(
            this.baseUrl + '/api/process-login',
            loginCredentials,
            { withCredentials: true }
        ) // need "withCredentials" for APIs that use the session
        .do((userInfo) => {
            this.loginStatusSubject.next({
                isLoggedIn: true,
                userInfo: userInfo
            });
        })
      ); // return (
  } // loginRequest()

  // DELETE /api/logout
  logOut() {
      return (
        this.httpThang.delete(
            this.baseUrl + '/api/logout',
            { withCredentials: true }
        ) // need "withCredentials" for APIs that use the session
        .do(() => {
            this.loginStatusSubject.next({ isLoggedIn: false })
        })
      ); // return (
  } // logOut()

}
