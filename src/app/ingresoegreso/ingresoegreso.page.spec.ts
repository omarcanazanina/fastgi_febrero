import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoegresoPage } from './ingresoegreso.page';

describe('IngresoegresoPage', () => {
  let component: IngresoegresoPage;
  let fixture: ComponentFixture<IngresoegresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoegresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoegresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
