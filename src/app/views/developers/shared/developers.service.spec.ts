import { TestBed } from '@angular/core/testing';

import { DevelopersService } from './developers.service';

describe('DevelopersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevelopersService = TestBed.get(DevelopersService);
    expect(service).toBeTruthy();
  });
});
