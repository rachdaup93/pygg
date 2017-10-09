import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class BankCalulationsService {

  constructor() { }
  timeSpan(deadline){
    let now = new Date();
    let timeDifference = Number(deadline) - Number(now);
    return Math.ceil(timeDifference/(24*60*60*1000));
  }
  numberPeriod(bank){
    const period = bank.payments.period;

    switch(period){
      case '1': return this.logOfPayments(bank, 1,'days');
      case '7': return this.logOfPayments(bank, 1,'weeks');
      case '14': return this.logOfPayments(bank, 2,'weeks');
      default: return this.logOfPayments(bank, 1, 'months');
    }
  }
  logOfPayments(bank, increment, type){
    let period = moment(bank.payments.startDate);
    let paymentLog = [];
    while(period.isBefore(bank.date)){
      paymentLog.push({
        date: period.format("dddd, MMMM Do YYYY")
      })
      period = period.add(increment, type);
    }
    return paymentLog;
  }
}
