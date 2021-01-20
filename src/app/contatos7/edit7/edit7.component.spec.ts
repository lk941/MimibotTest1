import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit7Component } from './edit7.component';

describe('Edit7Component', () => {
  let component: Edit7Component;
  let fixture: ComponentFixture<Edit7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
