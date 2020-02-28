import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroqrPage } from './cobroqr.page';

describe('CobroqrPage', () => {
  let component: CobroqrPage;
  let fixture: ComponentFixture<CobroqrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobroqrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobroqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
