import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityMapComponent } from './facility-map.component';

describe('FacilityMapComponent', () => {
  let component: FacilityMapComponent;
  let fixture: ComponentFixture<FacilityMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
