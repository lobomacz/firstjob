import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredencialesPage } from './credenciales.page';

describe('CredencialesPage', () => {
  let component: CredencialesPage;
  let fixture: ComponentFixture<CredencialesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredencialesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredencialesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
