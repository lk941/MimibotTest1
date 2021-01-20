import { TestBed } from '@angular/core/testing';

import { ContatoService } from './contato5.service';

describe('Contato5Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoService = TestBed.get(ContatoService);
    expect(service).toBeTruthy();
  });
});
