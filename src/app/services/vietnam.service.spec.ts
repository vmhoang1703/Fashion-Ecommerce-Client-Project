import { TestBed } from '@angular/core/testing';

import { VietnamService } from './vietnam.service';

describe('VietnamService', () => {
  let service: VietnamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VietnamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
