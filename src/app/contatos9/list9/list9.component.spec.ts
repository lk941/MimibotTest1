import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List9Component } from './list9.component';

describe('List9Component', () => {
  let component: List9Component;
  let fixture: ComponentFixture<List9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
