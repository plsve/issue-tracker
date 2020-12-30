import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  tableHeaderItems = [{
    name: 'Key'
  }, {
    name: 'Title'
  }, {
    name: 'Type'
  }, {
    name: 'Priority'
  }, {
    name: 'Status'
  }, {
    name: 'Assignee'
  }, {
    name: 'Time spent'
  }, {
    name: 'Time remaining'
  }, {
    name: 'Created'
  }, {
    name: 'Resolved'
  }
  ]

  constructor(
    private issueService: IssueService,
    public format: DataFormatter
  ) { }

  ngOnInit(): void {
    this.issueService.getIssues().subscribe(r => {
      this.issueList = r;
      console.log(this.issueList);
    })
  }

}
