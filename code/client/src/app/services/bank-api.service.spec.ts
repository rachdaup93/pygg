import { TestBed, inject } from '@angular/core/testing';

import { BankApiService } from './bank-api.service';

describe('BankApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankApiService]
    });
  });

  it('should be created', inject([BankApiService], (service: BankApiService) => {
    expect(service).toBeTruthy();
  }));
});
