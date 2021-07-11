import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KanbanDragService } from '../kanban-drag.service';

@Component({
  selector: 'app-issue-handle',
  templateUrl: './issue-handle.component.html',
  styleUrls: ['./issue-handle.component.scss']
})
export class IssueHandleComponent implements OnInit {

  @Input()
  issue;

  @Input()
  hideName;
  
  @Input()
  hideVerboseName;

  @Input()
  hideType: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(event){
    // this.router.navigateByUrl('/issues/' + this.issue.id);
    event.stopPropagation();

  }



}
