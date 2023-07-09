import { TestBed } from '@angular/core/testing';

import { CodeGuard } from './code.guard';

describe('CodeGuard', () => {
  let guard: CodeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CodeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
