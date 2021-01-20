import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List4Component } from './list4.component';

describe('List4Component', () => {
  let component: List4Component;
  let fixture: ComponentFixture<List4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
