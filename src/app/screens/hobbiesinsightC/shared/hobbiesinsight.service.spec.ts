import { TestBed } from '@angular/core/testing';

import { HobbiesinsightService } from './hobbiesinsight.service';

describe('Hobbiesinsight', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HobbiesinsightService = TestBed.get(HobbiesinsightService);
    expect(service).toBeTruthy();
  });
});
