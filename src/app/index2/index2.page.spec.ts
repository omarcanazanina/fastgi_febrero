import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Index2Page } from './index2.page';

describe('Index2Page', () => {
  let component: Index2Page;
  let fixture: ComponentFixture<Index2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Index2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Index2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
