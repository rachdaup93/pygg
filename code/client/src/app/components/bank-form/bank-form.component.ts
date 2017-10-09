import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BankInfo } from '../../interfaces/bank-info';
import { BankApiService } from '../../services/bank-api.service';
import { BankCalulationsService } from '../../services/bank-calulations.service'
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
      period: 0,
      numberPaymentsLeft: 0
    }
  };

  errorMessage: string;
  @Output() newBankNotifier = new EventEmitter();

  constructor(
    private bank: BankApiService,
    private calc: BankCalulationsService
  ) { }

  ngOnInit() {
  }

  newBankObject(){
    this.newBank.payments.remainingCost = this.newBank.totalValue;
    this.newBank.dateFormatted = moment(this.newBank.date).format("dddd, MMMM Do YYYY");
    let test = this.calc.numberPeriod(this.newBank);
    console.log(test);

    // console.log(this.calc.timeSpan(this.newBank.deadline));

    this.bank.addBank(this.newBank)
      .subscribe(
        (bankDetails) =>{
          console.log('New bank success', bankDetails);

          this.newBankNotifier.emit(bankDetails);
          this.newBank ={
            title: '',
            totalValue: 0,
            date: null,
            dateFormatted: '',
            payments: {
              startDate: null,
              remainingCost: 0,
              period: 0,
              numberPaymentsLeft: 0
            }
          };
  })}

}
