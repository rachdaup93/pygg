import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BankApiService } from '../../services/bank-api.service';
import { BanklistService } from '../../services/banklist.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
  banks: any[]  = [];
  constructor(
    private bankList: BanklistService
  ) { }

  ngOnInit() {
    this.banks = this.bankList.openBanks
  }
}
