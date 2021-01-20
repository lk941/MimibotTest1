import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato5-data.service';

describe('Contato5DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoDataService = TestBed.get(ContatoDataService);
    expect(service).toBeTruthy();
  });
});
