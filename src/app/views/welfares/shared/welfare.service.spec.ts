import { TestBed } from '@angular/core/testing';

import { WelfareService } from './welfare.service';

describe('WelfareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WelfareService = TestBed.get(WelfareService);
    expect(service).toBeTruthy();
  });
});
