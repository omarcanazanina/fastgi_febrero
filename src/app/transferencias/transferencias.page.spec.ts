import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasPage } from './transferencias.page';

describe('TransferenciasPage', () => {
  let component: TransferenciasPage;
  let fixture: ComponentFixture<TransferenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
