import { TestBed } from '@angular/core/testing';

import { Dbz } from './dbz';

describe('Dbz', () => {
  let service: Dbz;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dbz);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
