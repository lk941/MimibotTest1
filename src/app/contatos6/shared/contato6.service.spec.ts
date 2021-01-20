import { TestBed } from '@angular/core/testing';

import { ContatoService } from './contato6.service';

describe('Contato6Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoService = TestBed.get(ContatoService);
    expect(service).toBeTruthy();
  });
});
