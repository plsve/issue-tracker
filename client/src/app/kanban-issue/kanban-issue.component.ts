import { DOCUMENT } from '@angular/common';
import { ElementRef, HostListener, Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { KanbanDragService } from '../kanban-drag.service';

@Component({
  selector: 'app-kanban-issue',
  templateUrl: './kanban-issue.component.html',
  styleUrls: ['./kanban-issue.component.scss']
})
export class KanbanIssueComponent implements OnInit {

  @Input()
  issue;

  @Input()
  category;

  constructor(
    public kanbanDrag: KanbanDragService
  ) { }

  ngOnInit(): void {
  }

  public mouseDown(event: any) {

    this.kanbanDrag.isDragging = true;
    this.kanbanDrag.category = this.category;
    this.kanbanDrag.issue = this.issue;
  }

  // fixes issue with simple click
  mouseUp(){
    this.kanbanDrag.release();
  }




}
