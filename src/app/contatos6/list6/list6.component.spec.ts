import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List6Component } from './list6.component';

describe('List6Component', () => {
  let component: List6Component;
  let fixture: ComponentFixture<List6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
