import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit8Component } from './edit8.component';

describe('Edit8Component', () => {
  let component: Edit8Component;
  let fixture: ComponentFixture<Edit8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
