import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModpinPage } from './modpin.page';

describe('ModpinPage', () => {
  let component: ModpinPage;
  let fixture: ComponentFixture<ModpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModpinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
