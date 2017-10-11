import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { BankApiService } from '../../services/bank-api.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userInfo: any;
  banks: any[]  = [];
  constructor(
    private bank: BankApiService,
    private auth: AuthApiService
  ) { }

  ngOnInit() {
    this.bank.getBanks()
      .subscribe(
        (banksFromApi: any[]) =>{
          this.banks = banksFromApi;
        })
    
    this.auth.getLoginStatus()
        .subscribe(
          (loggedInInfo: any) => {
              if (loggedInInfo.isLoggedIn) {
                  this.userInfo = loggedInInfo.userInfo;
              }
          }
        );
  }
}
