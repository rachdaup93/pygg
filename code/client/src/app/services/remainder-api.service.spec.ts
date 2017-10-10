import { TestBed, inject } from '@angular/core/testing';

import { RemainderApiService } from './remainder-api.service';

describe('RemainderApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemainderApiService]
    });
  });

  it('should be created', inject([RemainderApiService], (service: RemainderApiService) => {
    expect(service).toBeTruthy();
  }));
});
