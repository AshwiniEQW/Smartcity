import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollReportComponent } from './poll-report.component';

describe('PollReportComponent', () => {
  let component: PollReportComponent;
  let fixture: ComponentFixture<PollReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
