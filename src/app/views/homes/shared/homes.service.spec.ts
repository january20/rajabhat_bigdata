import { TestBed } from '@angular/core/testing';

import { HomesService } from './homes.service';

describe('HomesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomesService = TestBed.get(HomesService);
    expect(service).toBeTruthy();
  });
});
