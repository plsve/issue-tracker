import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FILTER_DROPDOWN_TYPES } from '../constant/filter-dropdown-types.enum';
import { FILTER_PAGE_TYPES } from '../constant/filter-page-types.enum';
import { FilterService } from '../filter.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  @Input()
  filterType;

  @Output() 
  changed: EventEmitter<any> = new EventEmitter();

  FILTER_PAGE_TYPES = FILTER_PAGE_TYPES;
  FILTER_DROPDOWN_TYPES = FILTER_DROPDOWN_TYPES;

  constructor(
    public projectService: ProjectService,
    public filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.initVals(this.projectService.selectedProject != null);
  }

  initVals(isProjectSelected) {
    this.filterService.resetFilter([]);


    switch (this.filterType) {
      case FILTER_PAGE_TYPES.BOARD: {
        this.filterService.filter = {
          projects: isProjectSelected == true ? [this.projectService.selectedProject] : null,
          users: null,
          types: this.filterService.boardInitFilters,
          statuses: null,
          priorities: null,
          searchString: null,
        }
        break;
      }
      case FILTER_PAGE_TYPES.ISSUE: {
        this.filterService.filter = {
          projects: isProjectSelected == true ? [this.projectService.selectedProject] : null,
          users: null,
          types: null,
          statuses: null,
          searchString: null,
        }
        break;
      }
      case FILTER_PAGE_TYPES.PERSON: {
        this.filterService.filter = {
          projects: [this.projectService.selectedProject],
          searchString: null,
        }
      }
      break;
    }

  }



}
