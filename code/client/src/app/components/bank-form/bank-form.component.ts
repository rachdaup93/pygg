import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BankInfo } from '../../interfaces/bank-info';
import { BankApiService } from '../../services/bank-api.service';
import { RemainderApiService } from '../../services/remainder-api.service';
import { BankCalulationsService } from '../../services/bank-calulations.service';
import { environment } from '../../../environments/environment';

import * as moment from 'moment'

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {

  newBank: BankInfo ={
    title: '',
    totalValue: 0,
    date: null,
    dateFormatted: '',
    payments: {
      startDate: null,
      remainingCost: 0,
      period: 'bi-weekly',
      numberPaymentsLeft: 0,
      paymentLog: []
    }
  };

  errorMessage: string;
  @Output() newBankNotifier = new EventEmitter();

  constructor(
    private bank: BankApiService,
    private calc: BankCalulationsService,
    private remainder: RemainderApiService
  ) { }

  ngOnInit() {
  }

  newBankObject(){
    this.newBank.payments.remainingCost = this.newBank.totalValue;
    this.newBank.dateFormatted = moment(this.newBank.date).format("dddd, MMMM Do YYYY");
    this.newBank.payments.paymentLog = this.calc.numberPeriod(this.newBank);
    this.newBank.payments.numberPaymentsLeft = this.newBank.payments.paymentLog.length;

    // console.log(this.calc.timeSpan(this.newBank.deadline));

    this.bank.addBank(this.newBank)
      .subscribe(
        (bankDetails: any) =>{
          console.log('New bank success', bankDetails);
          this.remainder.sendNow({
            firstName: "Rachelle",
            title: bankDetails.title,
            phoneNumber: "9548029957",
            payment: bankDetails.payments.paymentLog[0].paymentVal,
            dueDate: bankDetails.payments.paymentLog[0].date
          })
            .subscribe(
              (messageDetails) =>{
                console.log("Message sent successfully.")
              }
            )
          this.newBankNotifier.emit(bankDetails);
          this.newBank ={
            title: '',
            totalValue: 0,
            date: null,
            dateFormatted: '',
            payments: {
              startDate: null,
              remainingCost: 0,
              period: 'bi-weekly',
              numberPaymentsLeft: 0,
              paymentLog: []
            }
          };
  })}

}
