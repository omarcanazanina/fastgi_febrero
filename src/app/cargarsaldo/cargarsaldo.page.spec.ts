import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarsaldoPage } from './cargarsaldo.page';

describe('CargarsaldoPage', () => {
  let component: CargarsaldoPage;
  let fixture: ComponentFixture<CargarsaldoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarsaldoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarsaldoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
