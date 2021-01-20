import { TestBed } from '@angular/core/testing';

import { ContatoService } from './contato10.service';

describe('Contato10Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoService = TestBed.get(ContatoService);
    expect(service).toBeTruthy();
  });
});
