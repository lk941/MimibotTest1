import { TestBed } from '@angular/core/testing';

import { Contato2Service } from './contato2.service';

describe('Contato2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Contato2Service = TestBed.get(Contato2Service);
    expect(service).toBeTruthy();
  });
});
