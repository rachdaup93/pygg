import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankApiService } from '../../services/bank-api.service';
import { BanklistService } from '../../services/banklist.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
  @Input() banks: any[];
  constructor(
    private bank: BankApiService
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit(){
  }
}
