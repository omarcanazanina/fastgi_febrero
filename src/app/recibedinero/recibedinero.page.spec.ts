import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibedineroPage } from './recibedinero.page';

describe('RecibedineroPage', () => {
  let component: RecibedineroPage;
  let fixture: ComponentFixture<RecibedineroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibedineroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibedineroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
