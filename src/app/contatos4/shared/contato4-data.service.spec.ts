import { TestBed } from '@angular/core/testing';

import { Contato4DataService } from './contato4-data.service';

describe('Contato4DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Contato4DataService = TestBed.get(Contato4DataService);
    expect(service).toBeTruthy();
  });
});
