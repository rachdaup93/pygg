import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignupInfo } from '../../interfaces/signup-info';
import { LoginInfo } from '../../interfaces/login-info';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser: SignupInfo = {
      signupFullName: '',
      signupUsername: '',
      signupPassword: ''
  };

  loginUser: LoginInfo = {
      loginUsername: '',
      loginPassword: ''
  };

  errorMessage: string;
  loginError: string;

  constructor(
    private authThang: AuthApiService,
    private routerThang: Router
  ) { }

  ngOnInit() {
  }

  signupSubmit() {
      this.authThang.postSignup(this.newUser)
        .subscribe(
          // if success, go to a different component
          (userInfo) => {
              this.routerThang.navigate(['']);
          },

          // if error, display the error
          (errInfo) => {
              console.log('Sign up error', errInfo);
              if (errInfo.status === 400) {
                  this.errorMessage = 'Validation error.';
              }
              else {
                  this.errorMessage = 'Something went wrong. Try again later.';
              }
          }
        ); // .subscribe()
  } // signupSubmit()

  loginSubmit() {
      this.authThang.postLogin(this.loginUser)
        .subscribe(
          // if success, redirect home
          (userInfo) => {
              this.routerThang.navigate(['']);
          },

          // if error, show feedback
          (errInfo) => {
              console.log('Log in error', errInfo);
              if (errInfo.status === 401) {
                  this.loginError = 'Bad credentials.';
              }
              else {
                  this.loginError = 'Something went wrong. Try again later.';
              }
          }
        ); // .subscribe()
  } // loginSubmit()

}
