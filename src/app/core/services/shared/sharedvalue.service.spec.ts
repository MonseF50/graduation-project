import { TestBed } from '@angular/core/testing';

import { SharedvalueService } from './sharedvalue.service';

describe('SharedvalueService', () => {
  let service: SharedvalueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedvalueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
