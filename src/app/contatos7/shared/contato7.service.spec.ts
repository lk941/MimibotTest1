import { TestBed } from '@angular/core/testing';

import { ContatoService } from './contato7.service';

describe('Contato7Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoService = TestBed.get(ContatoService);
    expect(service).toBeTruthy();
  });
});
