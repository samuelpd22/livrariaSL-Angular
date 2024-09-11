import { TestBed } from '@angular/core/testing';

import { LivrosServiceService } from './livros-service.service';

describe('LivrosServiceService', () => {
  let service: LivrosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivrosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
