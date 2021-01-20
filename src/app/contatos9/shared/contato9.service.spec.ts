import { TestBed } from '@angular/core/testing';

import { ContatoService } from './contato9.service';

describe('Contato9Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoService = TestBed.get(ContatoService);
    expect(service).toBeTruthy();
  });
});
