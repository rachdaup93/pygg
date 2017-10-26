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
      this.baseUrl + '/api/banks',
      { withCredentials: true }
    );}

  getBankDetails(bankId: string) {
        return this.http.get(
          this.baseUrl + '/api/banks/' + bankId
        );
    }

  addBank(bankObject: BankInfo){
    return this.http.post(
      this.baseUrl + '/api/banks',
      bankObject,
      { withCredentials: true }
    );}

  editBank(bankObject){
    console.log(bankObject)
    let id = bankObject._id;
    return this.http.put(
      this.baseUrl + '/api/banks/' + id,
      bankObject,
      { withCredentials: true }
    );}

  deleteBank(bankId){
    return this.http.delete(
      this.baseUrl + '/api/banks/' + bankId,
      { withCredentials: true }
    );
  }
}