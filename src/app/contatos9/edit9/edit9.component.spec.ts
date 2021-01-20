import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit9Component } from './edit9.component';

describe('Edit9Component', () => {
  let component: Edit9Component;
  let fixture: ComponentFixture<Edit9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
