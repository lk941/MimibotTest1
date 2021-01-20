import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato7-data.service';

describe('Contato7DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoDataService = TestBed.get(ContatoDataService);
    expect(service).toBeTruthy();
  });
});
