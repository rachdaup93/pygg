import { TestBed, inject } from '@angular/core/testing';

import { BanklistService } from './banklist.service';

describe('BanklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BanklistService]
    });
  });

  it('should be created', inject([BanklistService], (service: BanklistService) => {
    expect(service).toBeTruthy();
  }));
});
