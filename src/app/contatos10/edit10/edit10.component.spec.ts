import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit10Component } from './edit10.component';

describe('Edit10Component', () => {
  let component: Edit10Component;
  let fixture: ComponentFixture<Edit10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
