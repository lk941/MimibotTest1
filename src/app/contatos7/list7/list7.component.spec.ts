import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List7Component } from './list7.component';

describe('List7Component', () => {
  let component: List7Component;
  let fixture: ComponentFixture<List7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
