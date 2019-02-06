import { TestBed } from '@angular/core/testing';

import { PlazasService } from './plazas.service';

describe('ConvocatoriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlazasService = TestBed.get(PlazasService);
    expect(service).toBeTruthy();
  });
});
