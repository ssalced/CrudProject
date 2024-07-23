import { TestBed } from '@angular/core/testing';

import { ServicioListarService } from './servicio-listar.service';

describe('ServicioListarService', () => {
  let service: ServicioListarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioListarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
