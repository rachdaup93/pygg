import { Component, OnInit, Input } from '@angular/core';
import { BankInfo } from '../../interfaces/bank-info';
import { BankApiService } from '../../services/bank-api.service';
import { RemainderApiService } from '../../services/remainder-api.service';
import { BankCalulationsService } from '../../services/bank-calulations.service';
import { AuthApiService } from '../../services/auth-api.service';

import * as moment from 'moment';
declare var $:any;

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
      private calc: BankCalulationsService,
      private auth: AuthApiService
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
      $('select').material_select();
    }

  bankInfoObject(){
    this.bankInfo.payments.remainingCost = this.bankInfo.totalValue;
    this.bankInfo.dateFormatted = moment(this.bankInfo.date).format("dddd, MMMM Do YYYY");
    this.bankInfo.payments.paymentLog = this.calc.numberPeriod(this.bankInfo);
    this.bankInfo.payments.numberPaymentsLeft = this.bankInfo.payments.paymentLog.length;

    this.bank.editBank(this.bankInfo)
      .subscribe(
        (bankDetails: any) =>{
          console.log('Successful update')
    });
  }
}
