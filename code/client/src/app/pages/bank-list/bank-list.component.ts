import { Component, OnInit } from '@angular/core';
import { BankApiService } from '../../services/bank-api.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
  banks: any[]  = [];
  constructor(
    private bank: BankApiService
  ) { }

  ngOnInit() {
    this.bank.getBanks()
      .subscribe(
        (banksFromApi: any[]) =>{
          this.banks = banksFromApi;
        })
  }
  addBankToList(newBank){
    this.banks.unshift(newBank);
  }
}
