import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmacion1Page } from './confirmacion1.page';

describe('Confirmacion1Page', () => {
  let component: Confirmacion1Page;
  let fixture: ComponentFixture<Confirmacion1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Confirmacion1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Confirmacion1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
