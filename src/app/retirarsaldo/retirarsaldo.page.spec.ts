import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarsaldoPage } from './retirarsaldo.page';

describe('RetirarsaldoPage', () => {
  let component: RetirarsaldoPage;
  let fixture: ComponentFixture<RetirarsaldoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirarsaldoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirarsaldoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
