import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanerPage } from './escaner.page';

describe('EscanerPage', () => {
  let component: EscanerPage;
  let fixture: ComponentFixture<EscanerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscanerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscanerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
