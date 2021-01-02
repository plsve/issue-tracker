import { Component, Input, OnInit } from '@angular/core';
import { ISSUE_STATUSES } from '../constant/issue-status.enum';
import { ISSUE_TYPES } from '../constant/issue-types.enum';

@Component({
  selector: 'app-issue-type-badge',
  templateUrl: './issue-type-badge.component.html',
  styleUrls: ['./issue-type-badge.component.scss']
})
export class IssueTypeBadgeComponent implements OnInit {

  @Input()
  type;

  constructor() { }

  ngOnInit(): void {
  }

  getIcon() {

    switch (this.type) {
      case ISSUE_TYPES.EPIC: return 'offline_bolt';
      case ISSUE_TYPES.TASK: return 'turned_in';
      case ISSUE_TYPES.BUG: return 'bug_report';
    }
  }

  getStyle() {

    switch (this.type) {
      case ISSUE_TYPES.EPIC: return 'epic';
      case ISSUE_TYPES.TASK: return 'task';
      case ISSUE_TYPES.BUG: return 'bug';
    }
  }

  getTooltip() {
    switch (this.type) {
      case ISSUE_TYPES.EPIC: return 'Epic';
      case ISSUE_TYPES.TASK: return 'Task';
      case ISSUE_TYPES.BUG: return 'Bug';
    }
  }

}
