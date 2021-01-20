import { TestBed } from '@angular/core/testing';

import { Contato4Service } from './contato4.service';

describe('Contato4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Contato4Service = TestBed.get(Contato4Service);
    expect(service).toBeTruthy();
  });
});
