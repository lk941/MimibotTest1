import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesInsightComponent } from './hobbies-insight.component';

describe('HobbiesInsightComponent', () => {
  let component: HobbiesInsightComponent;
  let fixture: ComponentFixture<HobbiesInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HobbiesInsightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
