import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FILTER_DROPDOWN_TYPES } from '../constant/filter-dropdown-types.enum';
import { ISSUE_PRIORITIES } from '../constant/issue-priorities.enum';
import { ISSUE_STATUSES } from '../constant/issue-status.enum';
import { ISSUE_TYPES } from '../constant/issue-types.enum';
import { FilterService } from '../filter.service';
import { IssueService } from '../issue.service';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';
import { DataFormatter } from '../utils/data-formatter.utils';

@Component({
  selector: 'app-issue-field-dropdown',
  templateUrl: './issue-field-dropdown.component.html',
  styleUrls: ['./issue-field-dropdown.component.scss']
})
export class IssueFieldDropdownComponent implements OnInit {

  @Input()
  type;

  @Input()
  issue;

  @Output()
  newSubIssueConfirmed: EventEmitter<any> = new EventEmitter();

  isOpened = false;
  
  allValues = [];
  selectedValue;

  selectedSubIssue;

  FILTER_DROPDOWN_TYPES = FILTER_DROPDOWN_TYPES;

  constructor(
    public filterService: FilterService,
    public projectService: ProjectService,
    public userService: UserService,
    public issueService: IssueService,
    public format: DataFormatter
  ) { }

  ngOnInit(): void {

    this.initVals();
  }

  itemClicked(item){

    switch (this.type) {
      case FILTER_DROPDOWN_TYPES.PROJECT: {
        this.issue.user = item;
        break;
      }
      case FILTER_DROPDOWN_TYPES.ASSIGNEE: {
        this.issue.user = item;
        break;
      }
      case FILTER_DROPDOWN_TYPES.ISSUE: {
        this.issue.parentIssue = item;
        break;
      }
      case FILTER_DROPDOWN_TYPES.CHILD_ISSUE: {
        //emit
        this.newSubIssueConfirmed.emit(item);
        
        break;
      }
      case FILTER_DROPDOWN_TYPES.STATUS: {
        this.issue.status = item;
        break;        
      }
      case FILTER_DROPDOWN_TYPES.TYPE: {
        
        this.issue.type = item;
        
        break;
      }
      case FILTER_DROPDOWN_TYPES.PRIORITY: {   
        this.issue.priority = item;  
        break;
      }
    }

    this.closeDropdown();

    
  }

  closeDropdown() {
    if (this.isOpened) {

      this.isOpened = !this.isOpened;
    }
  }

  openDropdown() {
    this.isOpened = !this.isOpened;
  }


  initVals() {
    switch (this.type) {
      case FILTER_DROPDOWN_TYPES.PROJECT: {

        this.projectService.getProjects().subscribe(r => {
          this.allValues = r;
          // this.updateVals();
        })
        break;
      }
      case FILTER_DROPDOWN_TYPES.ASSIGNEE: {

        this.userService.getUsers({
          projects: [this.issue.project.id]
        }).subscribe(r => {
          this.allValues = r;
        })
        break;
      }
      case FILTER_DROPDOWN_TYPES.ISSUE: {

        this.issueService.getIssues({
          projects: [this.issue.project.id]
        }).subscribe(r => {
          this.allValues = r.filter(e => e.id != this.issue.id);
        })
        break;
      }
      case FILTER_DROPDOWN_TYPES.CHILD_ISSUE: {

        this.issueService.getIssues({
          projects: [this.issue.project.id],
          types: [ISSUE_TYPES.BUG, ISSUE_TYPES.TASK].join(",")
        }).subscribe(r => {
          this.allValues = r.filter(e => e.id != this.issue.id);
          
          //substract parent issue
          this.allValues = this.allValues.filter(e => e.id != this.issue.parentIssue.id);

          //substract existing childIssues          
          this.allValues = this.allValues.filter(e => this.issue.childIssues.map(ch => ch.id).indexOf(e.id) < 0);

          this.selectedSubIssue = this.allValues[0];
          this.selectedSubIssue = {
            name: null,
            verboseName: 'Choose sub issue',
            type: null
          }
          


        })
        break;
      }
      case FILTER_DROPDOWN_TYPES.STATUS: {

        this.allValues = Object.values(ISSUE_STATUSES);

        // this.updateVals();
        break;
      }
      case FILTER_DROPDOWN_TYPES.TYPE: {
        this.allValues = Object.values(ISSUE_TYPES);

        // this.updateVals();
        break;
      }
      case FILTER_DROPDOWN_TYPES.PRIORITY: {
        
        this.allValues = Object.values(ISSUE_PRIORITIES);

        // this.updateVals();
        break;
      }

    }
  }

  updateVals(){
    console.log('updateVals');
    
  }

  isRowDisabled(){
    return false
  }

  getClassForType(type) {

    switch (this.type) {
      case FILTER_DROPDOWN_TYPES.PROJECT: {
        // return obj.name;
      }
      case FILTER_DROPDOWN_TYPES.ASSIGNEE: {
        return 'assignee-dropdown';
      }
      case FILTER_DROPDOWN_TYPES.STATUS: {
        return 'status-dropdown';
      }
      case FILTER_DROPDOWN_TYPES.TYPE: {
        return 'type-dropdown';
      }
      case FILTER_DROPDOWN_TYPES.PRIORITY: {   
        return 'priority-dropdown';     
      }
    }
  }

}
