import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BankInfo } from '../interfaces/bank-info';
import { environment } from '../../environments/environment';

@Injectable()
export class RemainderApiService {
  baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  addRemainder(remainderObject){
    return this.http.post(
      this.baseUrl + '/api/remainders',
      remainderObject
    );}

  newBank(bankObject){
    return this.http.post(
      this.baseUrl + '/api/remainders/newBankNotifier',
      bankObject
    );
  }
  updateBank(remainderObject){
    return this.http.post(
      this.baseUrl + '/api/remainders/bankUpdateNotifier',
      bankObject
    );
  }
}
