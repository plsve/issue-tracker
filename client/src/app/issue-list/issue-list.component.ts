import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FILTER_PAGE_TYPES } from '../constant/filter-page-types.enum';
import { FilterService } from '../filter.service';
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
  hoveringOnHeader = false;
  FILTER_PAGE_TYPES = FILTER_PAGE_TYPES;

  columnData = [{
    text: 'Key',
    name: 'name',
  }, {
    text: 'Title',
    name: 'verboseName',
  }, {
    text: 'Type',
    name: 'type',
  }, {
    text: 'Priority',
    name: 'priority',
  }, {
    text: 'Status',
    name: 'status',
  }, {
    text: 'Assignee',
    name: 'user',
  }, {
    text: 'Time spent',
    name: 'hoursSpent',
  }, {
    text: 'Time remaining',
    name: 'hoursRemaining',
  }, {
    text: 'Created',
    name: 'created',
  }, {
    text: 'Resolved',
    name: 'resolved',
  }
  ]

  constructor(
    private issueService: IssueService,
    public filterService: FilterService,
    public format: DataFormatter,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('sort-up',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sort-arrow-up.svg'));
    iconRegistry.addSvgIcon('sort-down',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sort-arrow-down.svg'));
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){    
    this.issueService.getIssues(this.filterService.getQueryParams()).subscribe(r => {
      this.issueList = r;
      // this.issueList = this.issueList.concat(r);
      // this.issueList = this.issueList.concat(r);
      // this.issueList = this.issueList.concat(r);
      // this.issueList = this.issueList.concat(r);
      // this.issueList = this.issueList.concat(r);
      this.sortData('name', false);
    })
  }

  // TODO add sensible sorts specific for issue table - assignee, type, status, 
  sortData(name, asc) {
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
