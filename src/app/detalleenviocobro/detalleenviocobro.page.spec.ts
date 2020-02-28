import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleenviocobroPage } from './detalleenviocobro.page';

describe('DetalleenviocobroPage', () => {
  let component: DetalleenviocobroPage;
  let fixture: ComponentFixture<DetalleenviocobroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleenviocobroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleenviocobroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
