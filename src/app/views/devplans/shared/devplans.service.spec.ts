import { TestBed } from '@angular/core/testing';

import { DevplansService } from './devplans.service';

describe('DevplansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevplansService = TestBed.get(DevplansService);
    expect(service).toBeTruthy();
  });
});
