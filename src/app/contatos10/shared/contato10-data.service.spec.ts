import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato10-data.service';

describe('Contato10DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoDataService = TestBed.get(ContatoDataService);
    expect(service).toBeTruthy();
  });
});
