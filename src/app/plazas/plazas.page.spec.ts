import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazasPage } from './plazas.page';

describe('PlazasPage', () => {
  let component: PlazasPage;
  let fixture: ComponentFixture<PlazasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
