import { TestBed } from '@angular/core/testing';

import { ConvocatoriasService } from './convocatorias.service';

describe('ConvocatoriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvocatoriasService = TestBed.get(ConvocatoriasService);
    expect(service).toBeTruthy();
  });
});
