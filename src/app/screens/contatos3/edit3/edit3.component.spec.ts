import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit3Component } from './edit3.component';

describe('Edit3Component', () => {
  let component: Edit3Component;
  let fixture: ComponentFixture<Edit3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
