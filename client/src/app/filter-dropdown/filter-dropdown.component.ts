import { ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FILTER_DROPDOWN_TYPES } from '../constant/filter-dropdown-types.enum';
import { ISSUE_STATUSES } from '../constant/issue-status.enum';
import { ISSUE_TYPES } from '../constant/issue-types.enum';
import { FilterService } from '../filter.service';
import { IssueService } from '../issue.service';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';
import { DataFormatter } from '../utils/data-formatter.utils';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent implements OnInit {

  // @ViewChild('checkBox')
  // checkBox: any;

  @Input()
  type;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  isHighlighted = false;
  isSelected = false;
  selectedValues = [];
  allValues = [];
  FILTER_DROPDOWN_TYPES = FILTER_DROPDOWN_TYPES;
  dropdownContentBuffer = '';

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

  initVals() {
    switch (this.type) {
      case FILTER_DROPDOWN_TYPES.PROJECT: {

        this.projectService.getProjects().subscribe(r => {
          this.allValues = r.map(e => {
            return {
              ...e,
              checked: this.projectService.selectedProject.id == e.id
            }
          })
          this.updateVals();
        })
        break;
      }
      case FILTER_DROPDOWN_TYPES.ASSIGNEE: {
        let projects = this.filterService.filter['projects'];
        if (projects == null) {
          projects = [];
        } else {
          projects = projects.map(e => e.id);
        }

        this.userService.getUsers({
          projects: projects
        }).subscribe(r => {
          this.allValues = r.map(e => {
            return {
              ...e,
              checked: false
            }
          })
          this.updateVals();
        })
        break;
      }
      case FILTER_DROPDOWN_TYPES.STATUS: {

        this.allValues = Object.values(ISSUE_STATUSES).map(e => {
          return {
            value: e,
            checked: false
          }
        })

        this.updateVals();
        break;
      }
      case FILTER_DROPDOWN_TYPES.TYPE: {
        this.allValues = Object.values(ISSUE_TYPES).map(e => {
          return {
            value: e,
            checked: false
          }
        })

        this.updateVals();
        break;
      }

    }
  }

  openDropdown() {
    this.isSelected = !this.isSelected;
    this.dropdownContentBuffer = JSON.stringify(this.selectedValues);

  }

  closeDropdown(event) {

    if (this.isSelected) {
      // console.log('closeDropdown');

      this.isSelected = !this.isSelected;

      // content changed, emit event to reload page
      if (this.dropdownContentBuffer != JSON.stringify(this.selectedValues)) {
        console.log('emitting');

        this.changed.emit();
      }
    }



  }

  getValueForType(obj) {

    switch (this.type) {
      case FILTER_DROPDOWN_TYPES.PROJECT: {
        return obj.name;
      }
      case FILTER_DROPDOWN_TYPES.ASSIGNEE: {
        return obj.username;
      }
      case FILTER_DROPDOWN_TYPES.STATUS: {
        return this.format.capitalize(obj.value);
      }
      case FILTER_DROPDOWN_TYPES.TYPE: {
        return this.format.capitalize(obj.value);
      }
    }
  }

  updateVals() {
    this.selectedValues = this.allValues.filter(e => e.checked);
    this.isHighlighted = this.selectedValues.length > 0;

    // todo update filter vals
    this.filterService.updateFilter(this.type, this.selectedValues);
    console.log(this.filterService.filter);
    


    
  }

}
