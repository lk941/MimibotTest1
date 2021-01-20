import { TestBed } from '@angular/core/testing';

import { Contato2DataService } from './contato2-data.service';

describe('Contato2DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Contato2DataService = TestBed.get(Contato2DataService);
    expect(service).toBeTruthy();
  });
});
