import { TestBed } from '@angular/core/testing';

import { TosterngService } from './tosterng.service';

describe('TosterngService', () => {
  let service: TosterngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosterngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
