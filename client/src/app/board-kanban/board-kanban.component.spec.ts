import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardKanbanComponent } from './board-kanban.component';

describe('BoardKanbanComponent', () => {
  let component: BoardKanbanComponent;
  let fixture: ComponentFixture<BoardKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardKanbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
