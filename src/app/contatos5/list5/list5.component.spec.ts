import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List5Component } from './list5.component';

describe('List5Component', () => {
  let component: List5Component;
  let fixture: ComponentFixture<List5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
