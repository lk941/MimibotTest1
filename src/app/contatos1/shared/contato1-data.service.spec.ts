import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato1-data.service';

describe('Contato1DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoDataService = TestBed.get(ContatoDataService);
    expect(service).toBeTruthy();
  });
});
