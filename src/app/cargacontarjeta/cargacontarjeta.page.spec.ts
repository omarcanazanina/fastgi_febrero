import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargacontarjetaPage } from './cargacontarjeta.page';

describe('CargacontarjetaPage', () => {
  let component: CargacontarjetaPage;
  let fixture: ComponentFixture<CargacontarjetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargacontarjetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargacontarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
