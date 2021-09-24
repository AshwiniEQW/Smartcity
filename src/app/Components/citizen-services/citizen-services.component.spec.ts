import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenServicesComponent } from './citizen-services.component';

describe('CitizenServicesComponent', () => {
  let component: CitizenServicesComponent;
  let fixture: ComponentFixture<CitizenServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitizenServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
