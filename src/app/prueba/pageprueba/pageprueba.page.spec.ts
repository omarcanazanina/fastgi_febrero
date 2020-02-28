import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagepruebaPage } from './pageprueba.page';

describe('PagepruebaPage', () => {
  let component: PagepruebaPage;
  let fixture: ComponentFixture<PagepruebaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagepruebaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagepruebaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
