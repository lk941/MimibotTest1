import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato8-data.service';

describe('Contato8DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoDataService = TestBed.get(ContatoDataService);
    expect(service).toBeTruthy();
  });
});
