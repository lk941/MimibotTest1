import { TestBed } from '@angular/core/testing';

import { Contato3DataService } from './contato3-data.service';

describe('Contato3DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Contato3DataService = TestBed.get(Contato3DataService);
    expect(service).toBeTruthy();
  });
});
