import { TestBed } from '@angular/core/testing';

import { ReligiousService } from './religious.service';

describe('ReligiousService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReligiousService = TestBed.get(ReligiousService);
    expect(service).toBeTruthy();
  });
});
