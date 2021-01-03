import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IssueService } from '../issue.service';
import { DataFormatter } from '../utils/data-formatter.utils';

export interface IssueHeader {

}

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  issueList = [];
  sortedIssueList = [];
  hoveringOnHeader = false;

  columnData = [{
    text: 'Key',
    name: 'name',
    sorted: false
  }, {
    text: 'Title',
    name: 'verboseName',
    sorted: false
  }, {
    text: 'Type',
    name: 'type',
    sorted: false
  }, {
    text: 'Priority',
    name: 'priority',
    sorted: false
  }, {
    text: 'Status',
    name: 'status',
    sorted: false
  }, {
    text: 'Assignee',
    name: 'user',
    sorted: false
  }, {
    text: 'Time spent',
    name: 'hoursSpent',
    sorted: false
  }, {
    text: 'Time remaining',
    name: 'hoursRemaining',
    sorted: false
  }, {
    text: 'Created',
    name: 'created',
    sorted: false
  }, {
    text: 'Resolved',
    name: 'resolved',
    sorted: false
  }
  ]

  constructor(
    private issueService: IssueService,
    public format: DataFormatter,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('sort-up',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sort-arrow-up.svg'));
    iconRegistry.addSvgIcon('sort-down',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sort-arrow-down.svg'));
  }

  ngOnInit(): void {
    this.issueService.getIssues().subscribe(r => {
      this.issueList = r;
      this.issueList = this.issueList.concat(r);
      this.issueList = this.issueList.concat(r);
      this.issueList = this.issueList.concat(r);
      this.issueList = this.issueList.concat(r);
      this.issueList = this.issueList.concat(r);
      this.sortData('name', false);
      console.log(this.issueList);
    })
  }

  // TODO add sensible sorts specific for issue table - assignee, type, status, 
  sortData(name, asc) {
    console.log(name, asc);
    this.issueList.sort((a, b) => {
      if (asc) {
        return a[name] < b[name] ? -1 : 0;
      } else {
        return a[name] > b[name] ? -1 : 1;
      }

    })
  }

  onHoverHeader(mouseOn) {
    this.hoveringOnHeader = mouseOn;
  }



}
