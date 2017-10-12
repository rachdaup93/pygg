import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { BankApiService } from '../../services/bank-api.service';
import { BanklistService } from '../../services/banklist.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userInfo: any;
  banks: any[]  = [];
  isFormOn: boolean = false;

  constructor(
    private bank: BankApiService,
    private auth: AuthApiService,
    private bankList: BanklistService
  ) { }

  ngOnInit() {
    this.bank.getBanks()
      .subscribe(
        (banksFromApi: any[]) =>{
          this.banks = banksFromApi;
          console.log(this.banks)
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

  showForm() {
    // PRO WAY
    // this.isFormOn = !this.isFormOn;

    if (this.isFormOn) {
        this.isFormOn = false;
    }
    else {
        this.isFormOn = true;
    }
}
}
