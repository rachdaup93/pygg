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
      case 'daily': return this.logOfPayments(bank, 1,'days');
      case 'weekly': return this.logOfPayments(bank, 1,'weeks');
      case 'bi-weekly': return this.logOfPayments(bank, 2,'weeks');
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
    paymentLog = this.reoccurringPaymentValue(bank, paymentLog)
    return paymentLog;
  }

  reoccurringPaymentValue(bank, log){
    let reoccurVal = bank.totalValue/log.length;
    reoccurVal = Number(reoccurVal.toFixed(2));
    const initVal = reoccurVal + bank.totalValue%reoccurVal
    log[0].paymentVal = Number(initVal.toFixed(2));;

    for(let i = 1; i < log.length; i++){
      log[i].paymentVal = reoccurVal;
    }
    return log;
  }
}
