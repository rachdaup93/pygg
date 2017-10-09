import { TestBed, inject } from '@angular/core/testing';

import { BankCalulationsService } from './bank-calulations.service';

describe('BankcalulationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankCalulationsService]
    });
  });

  it('should be created', inject([BankCalulationsService], (service: BankCalulationsService) => {
    expect(service).toBeTruthy();
  }));
});
