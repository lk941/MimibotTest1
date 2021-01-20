import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit6Component } from './edit6.component';

describe('Edit6Component', () => {
  let component: Edit6Component;
  let fixture: ComponentFixture<Edit6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
