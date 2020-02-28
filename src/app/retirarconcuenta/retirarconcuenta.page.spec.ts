import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarconcuentaPage } from './retirarconcuenta.page';

describe('RetirarconcuentaPage', () => {
  let component: RetirarconcuentaPage;
  let fixture: ComponentFixture<RetirarconcuentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirarconcuentaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirarconcuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
