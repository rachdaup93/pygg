import { Component, OnInit, Input } from '@angular/core';
import { BankInfo } from '../../interfaces/bank-info';
import { BankApiService } from '../../services/bank-api.service';
import { RemainderApiService } from '../../services/remainder-api.service';
import { BankCalulationsService } from '../../services/bank-calulations.service';
import { AuthApiService } from '../../services/auth-api.service';

import * as moment from 'moment';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.css']
})
export class BankEditComponent implements OnInit {
  @Input() bankInfo: any;
  userInfo: any;
  date: any;
  startDate: any;

  errorMessage: string;
    constructor(
      private bank: BankApiService,
      private auth: AuthApiService
    ) {
    }

    ngOnInit() {
    }

  bankInfoObject(){
    this.bank.editBank(this.bankInfo)
      .subscribe(
        (bankDetails: any) =>{
          console.log('Successful update')
    });
  }
}
