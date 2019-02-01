import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicantesComponent } from './aplicantes.component';

describe('AplicantesComponent', () => {
  let component: AplicantesComponent;
  let fixture: ComponentFixture<AplicantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
