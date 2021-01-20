import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BullyInsightComponent } from './bully-insight.component';

describe('BullyInsightComponent', () => {
  let component: BullyInsightComponent;
  let fixture: ComponentFixture<BullyInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BullyInsightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BullyInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


