import { TestBed } from '@angular/core/testing';

import { ParentChildCommunicationService } from './child-parent-communication.service';

describe('ParentChildCommunicationService', () => {
  let service: ParentChildCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentChildCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
