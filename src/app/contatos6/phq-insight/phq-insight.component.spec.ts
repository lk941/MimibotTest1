import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhqInsightComponent } from './phq-insight.component';

describe('PhqInsightComponent', () => {
  let component: PhqInsightComponent;
  let fixture: ComponentFixture<PhqInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhqInsightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhqInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


