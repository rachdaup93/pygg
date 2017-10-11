import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BankInfo } from '../../interfaces/bank-info';
import { BankApiService } from '../../services/bank-api.service';
import { RemainderApiService } from '../../services/remainder-api.service';
import { BankCalulationsService } from '../../services/bank-calulations.service';
import { environment } from '../../../environments/environment';
import { AuthApiService } from '../../services/auth-api.service';

import * as moment from 'moment'

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

    imageDomain = environment.apiUrl;

    bankInfo: any = {};
    userInfo: any;

    constructor(
      private activated: ActivatedRoute,
      private router: Router,
      private bank: BankApiService,
      private auth: AuthApiService
    ) { }

    ngOnInit() {
        this.activated.params.subscribe((myParams) => {
                                  // { path: 'phone/:phoneId'
            this.bank.getBankDetails(myParams.bankId)
              .subscribe(
                (bankFromApi) => {
                    this.bankInfo = bankFromApi;
                }
              );
        });

        this.auth.getLoginStatus()
          .subscribe(
            (loggedInInfo: any) => {
                if (loggedInInfo.isLoggedIn) {
                    this.userInfo = loggedInInfo.userInfo;
                }
            }
          );
    } // ngOnInit()

    deleteClick() {
        // call the API for deletion
        this.bank.deleteBank(this.bankInfo._id)
          .subscribe(
            () => {
                this.router.navigate(['']);
            }
          );
    }

}
