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

  getBankDetails(bankId: string) {
        return this.http.get(
          this.baseUrl + '/api/banks/' + bankId
        );
    }

  addBank(bankObject: BankInfo){
    return this.http.post(
      this.baseUrl + '/api/banks',
      bankObject
    );}

  editBank(bankObject){
    let id = bankObject._id;
    return this.http.put(
      this.baseUrl + '/api/banks/' + id,
      bankObject
    );
  }
}
