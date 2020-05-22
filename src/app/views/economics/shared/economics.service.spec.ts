import { TestBed } from '@angular/core/testing';

import { EconomicsService } from './economics.service';

describe('EconomicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EconomicsService = TestBed.get(EconomicsService);
    expect(service).toBeTruthy();
  });
});
