import { Component,
        OnInit,
        Output,
        EventEmitter,
        AfterViewInit
        } from '@angular/core';

import { BankInfo } from '../../interfaces/bank-info';
import { BankApiService } from '../../services/bank-api.service';
import { RemainderApiService } from '../../services/remainder-api.service';
import { BankCalulationsService } from '../../services/bank-calulations.service';
import { environment } from '../../../environments/environment';

import * as moment from 'moment'

declare var $:any;
@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit, AfterViewInit {

  newBank: BankInfo ={
    title: '',
    totalValue: null,
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

  ngAfterViewInit(){
    $('select').material_select();
  }

  newBankObject(){
    this.newBank.payments.remainingCost = this.newBank.totalValue;
    this.newBank.dateFormatted = moment(this.newBank.date).format("dddd, MMMM Do YYYY");
    this.newBank.payments.paymentLog = this.calc.numberPeriod(this.newBank);
    this.newBank.payments.numberPaymentsLeft = this.newBank.payments.paymentLog.length;

    this.bank.addBank(this.newBank)
      .subscribe(
        (bankDetails: any) =>{
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
            totalValue: null,
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
