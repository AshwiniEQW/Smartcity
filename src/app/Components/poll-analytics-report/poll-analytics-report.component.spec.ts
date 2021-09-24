import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollAnalyticsReportComponent } from './poll-analytics-report.component';

describe('PollAnalyticsReportComponent', () => {
  let component: PollAnalyticsReportComponent;
  let fixture: ComponentFixture<PollAnalyticsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollAnalyticsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollAnalyticsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
