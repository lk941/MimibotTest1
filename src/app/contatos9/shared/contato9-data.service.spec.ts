import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato9-data.service';

describe('Contato6DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoDataService = TestBed.get(ContatoDataService);
    expect(service).toBeTruthy();
  });
});
