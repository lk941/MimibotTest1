import { TestBed } from '@angular/core/testing';

import { ContatoService } from './contato8.service';

describe('Contato8Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoService = TestBed.get(ContatoService);
    expect(service).toBeTruthy();
  });
});
