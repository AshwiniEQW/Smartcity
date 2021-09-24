import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaSubmissionDetailsComponent } from './idea-submission-details.component';

describe('IdeaSubmissionDetailsComponent', () => {
  let component: IdeaSubmissionDetailsComponent;
  let fixture: ComponentFixture<IdeaSubmissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaSubmissionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaSubmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
