import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginInfo } from '../../interfaces/login-info';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginUser: LoginInfo = {
      loginUsername: '',
      loginPassword: ''
  };

  errorMessage: string;
  loginError: string;

  constructor(
    private auth: AuthApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginSubmit() {
      this.auth.postLogin(this.loginUser)
        .subscribe(
          // if success, redirect home
          (userInfo) => {
              this.router.navigate(['profile']);
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
