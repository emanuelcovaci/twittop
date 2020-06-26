import { TestBed } from '@angular/core/testing';

import { FlaskServerService } from './flask-server.service';

describe('FlaskServerService', () => {
  let service: FlaskServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaskServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
