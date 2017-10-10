import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankApiService } from '../../services/bank-api.service';
import { BankCalulationsService } from '../../services/bank-calulations.service';

@Component({
  selector: 'bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.css']
})
export class BankItemComponent implements OnInit {

  @Input() bankItem: any;


  constructor(
    private bank: BankApiService,
    private calc: BankCalulationsService
  ) { }

  ngOnInit() {
  }

  payNow(){
    const modifyBank = this.calc.payDueAmount(this.bankItem);
    this.bank.editBank(modifyBank)
      .subscribe(
      (bank: any) =>{
        this.bankItem = bank;
      })
  }

}
