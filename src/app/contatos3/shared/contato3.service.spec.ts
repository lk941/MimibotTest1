import { TestBed } from '@angular/core/testing';

import { Contato3Service } from './contato3.service';

describe('Contato3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Contato3Service = TestBed.get(Contato3Service);
    expect(service).toBeTruthy();
  });
});
