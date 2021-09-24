import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenReportComponent } from './citizen-report.component';

describe('CitizenReportComponent', () => {
  let component: CitizenReportComponent;
  let fixture: ComponentFixture<CitizenReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitizenReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
