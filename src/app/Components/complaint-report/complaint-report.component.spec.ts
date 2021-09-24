import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintReportComponent } from './complaint-report.component';

describe('ComplaintReportComponent', () => {
  let component: ComplaintReportComponent;
  let fixture: ComponentFixture<ComplaintReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
