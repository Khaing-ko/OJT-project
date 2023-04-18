import { TestBed } from '@angular/core/testing';

import { SuppliertypeService } from './suppliertype.service';

describe('SuppliertypeService', () => {
  let service: SuppliertypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliertypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
