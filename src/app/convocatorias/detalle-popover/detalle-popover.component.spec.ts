import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePopoverComponent } from './detalle-popover.component';

describe('DetallePopoverComponent', () => {
  let component: DetallePopoverComponent;
  let fixture: ComponentFixture<DetallePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
