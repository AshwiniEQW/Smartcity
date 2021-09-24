import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenDetailsComponent } from './citizen-details.component';

describe('CitizenDetailsComponent', () => {
  let component: CitizenDetailsComponent;
  let fixture: ComponentFixture<CitizenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitizenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
