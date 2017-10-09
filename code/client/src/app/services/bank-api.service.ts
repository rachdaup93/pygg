import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BankInfo } from '../interfaces/bank-info';
import { environment } from '../../environments/environment';

@Injectable()
export class BankApiService {
  baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getBanks(){
    return this.http.get(
      this.baseUrl + '/api/banks'
    );}

  addBank(bankObject: BankInfo){
    return this.http.post(
      this.baseUrl + '/api/banks',
      bankObject
    );}
  
}
