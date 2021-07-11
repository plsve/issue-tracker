import { TestBed } from '@angular/core/testing';

import { KanbanDragService } from './kanban-drag.service';

describe('KanbanDragService', () => {
  let service: KanbanDragService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanbanDragService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
