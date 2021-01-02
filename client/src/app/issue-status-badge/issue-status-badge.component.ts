import { Component, Input, OnInit } from '@angular/core';
import { ISSUE_STATUSES } from '../constant/issue-status.enum';
import { DataFormatter } from '../utils/data-formatter.utils';

@Component({
  selector: 'app-issue-status-badge',
  templateUrl: './issue-status-badge.component.html',
  styleUrls: ['./issue-status-badge.component.scss']
})
export class IssueStatusBadgeComponent implements OnInit {

  @Input()
  status;

  @Input()
  hideText = false;
  
  @Input()
  hideBorder = false;

  constructor(public format: DataFormatter) { }

  ngOnInit(): void {
  }

  getStyle() {
    let borderClass = '';
    if(!this.hideBorder){
      borderClass = ' border';
    }

    switch (this.status) {
      case ISSUE_STATUSES.OPEN: return 'icon-open' + borderClass;
      case ISSUE_STATUSES.IN_PROGRESS: return 'icon-in-progress' + borderClass;
      case ISSUE_STATUSES.NEEDS_INFORMATION: return 'icon-needs-info' + borderClass;
      case ISSUE_STATUSES.DONE: return 'icon-done' + borderClass;
      case ISSUE_STATUSES.CANCELED: return 'icon-canceled' + borderClass;
    }
  }

  getText(){
    switch (this.status) {
      case ISSUE_STATUSES.OPEN: return 'Open';
      case ISSUE_STATUSES.IN_PROGRESS: return 'In progress';
      case ISSUE_STATUSES.NEEDS_INFORMATION: return 'Needs info';
      case ISSUE_STATUSES.DONE: return 'Done';
      case ISSUE_STATUSES.CANCELED: return 'Canceled';
    }
  }

  getIcon(){

    switch(this.status) {
        case ISSUE_STATUSES.OPEN: return 'radio_button_unchecked';
        case ISSUE_STATUSES.IN_PROGRESS: return 'timelapse';
        case ISSUE_STATUSES.NEEDS_INFORMATION: return 'info';
        case ISSUE_STATUSES.DONE: return 'check_circle';
        case ISSUE_STATUSES.CANCELED: return 'cancel';
    }

}

}
