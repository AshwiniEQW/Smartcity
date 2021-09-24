import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaSubmissionReportComponent } from './idea-submission-report.component';

describe('IdeaSubmissionReportComponent', () => {
  let component: IdeaSubmissionReportComponent;
  let fixture: ComponentFixture<IdeaSubmissionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaSubmissionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaSubmissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
