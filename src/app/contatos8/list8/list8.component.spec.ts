import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List8Component } from './list8.component';

describe('List8Component', () => {
  let component: List8Component;
  let fixture: ComponentFixture<List8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
