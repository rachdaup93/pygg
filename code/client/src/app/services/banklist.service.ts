import { Injectable } from '@angular/core';
import { BankApiService } from './bank-api.service';

@Injectable()
export class BanklistService {
  openBanks: any[]  = [];
  constructor(
    private bank: BankApiService
  ) { }

  ngOnInit() {
    console.log('test')
    this.bank.getBanks()
      .subscribe(
        (banksFromApi: any[]) =>{
          this.openBanks = banksFromApi;
        })
  }
  addBankToList(newBank){
    this.openBanks.unshift(newBank);
  }

}
