import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarenviocobroPage } from './pagarenviocobro.page';

describe('PagarenviocobroPage', () => {
  let component: PagarenviocobroPage;
  let fixture: ComponentFixture<PagarenviocobroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarenviocobroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarenviocobroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
