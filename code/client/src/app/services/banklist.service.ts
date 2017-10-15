import { Injectable } from '@angular/core';
import { BankApiService } from './bank-api.service';
import { AuthApiService } from './auth-api.service';

@Injectable()
export class BanklistService {
  openBanks: any[]  = [];
  userInfo: any;

  constructor(
    private bank: BankApiService,
    private auth: AuthApiService
  ) { }

  ngOnInit() { }
  
  addBankToList(newBank){
    this.openBanks.unshift(newBank);
  }

}
