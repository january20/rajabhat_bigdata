import { TestBed } from '@angular/core/testing';

import { KpiService } from './kpi.service';

describe('KpiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpiService = TestBed.get(KpiService);
    expect(service).toBeTruthy();
  });
});
