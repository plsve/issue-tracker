import { Injectable } from '@angular/core';
import { FILTER_DROPDOWN_TYPES } from './constant/filter-dropdown-types.enum';
import { FILTER_PAGE_TYPES } from './constant/filter-page-types.enum';
import { ISSUE_TYPES } from './constant/issue-types.enum';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filter = {};

  selectedValues = {
    [FILTER_PAGE_TYPES.ISSUE]: {
      [FILTER_DROPDOWN_TYPES.PROJECT]: {
        values: [],
        isHighlighted: false
      },
      [FILTER_DROPDOWN_TYPES.ASSIGNEE]: {
        values: [],
        isHighlighted: false
      },
      [FILTER_DROPDOWN_TYPES.TYPE]: {
        values: [],
        isHighlighted: false
      },
      [FILTER_DROPDOWN_TYPES.STATUS]: {
        values: [],
        isHighlighted: false
      },
    },
    [FILTER_PAGE_TYPES.BOARD]: {
      [FILTER_DROPDOWN_TYPES.ASSIGNEE]: {
        values: [],
        isHighlighted: false
      },
      [FILTER_DROPDOWN_TYPES.TYPE]: {
        values: [],
        isHighlighted: false
      },
      [FILTER_DROPDOWN_TYPES.PRIORITY]: {
        values: [],
        isHighlighted: false
      },
    },
    [FILTER_PAGE_TYPES.PERSON]: {

    },
  }

  boardInitFilters = [
    { value: ISSUE_TYPES.EPIC, checked: true },
    { value: ISSUE_TYPES.BUG, checked: true },
    { value: ISSUE_TYPES.TASK, checked: true }
  ];

  constructor() { }


  resetFilter(projects) {
    this.filter = {
      projects: projects
    };

    this.selectedValues = {
      [FILTER_PAGE_TYPES.ISSUE]: {
        [FILTER_DROPDOWN_TYPES.PROJECT]: {
          values: projects,
          isHighlighted: projects.length > 0
        },
        [FILTER_DROPDOWN_TYPES.ASSIGNEE]: {
          values: [],
          isHighlighted: false
        },
        [FILTER_DROPDOWN_TYPES.TYPE]: {
          values: [],
          isHighlighted: false
        },
        [FILTER_DROPDOWN_TYPES.STATUS]: {
          values: [],
          isHighlighted: false
        },
      },
      [FILTER_PAGE_TYPES.BOARD]: {
        [FILTER_DROPDOWN_TYPES.ASSIGNEE]: {
          values: [],
          isHighlighted: false
        },
        [FILTER_DROPDOWN_TYPES.TYPE]: {
          values: [],
          isHighlighted: false
        },
        [FILTER_DROPDOWN_TYPES.PRIORITY]: {
          values: [],
          isHighlighted: false
        },
      },
      [FILTER_PAGE_TYPES.PERSON]: {

      },
    }


  }

  updateFilter(type, selectedValues) {
    switch (type) {
      case FILTER_DROPDOWN_TYPES.PROJECT: {
        this.filter['projects'] = selectedValues;
        break;
      }
      case FILTER_DROPDOWN_TYPES.ASSIGNEE: {
        this.filter['users'] = selectedValues;
        break;
      }
      case FILTER_DROPDOWN_TYPES.STATUS: {
        this.filter['statuses'] = selectedValues;
        break;
      }
      case FILTER_DROPDOWN_TYPES.TYPE: {
        this.filter['types'] = selectedValues;
        break;
      }
      case FILTER_DROPDOWN_TYPES.PRIORITY: {
        this.filter['priorities'] = selectedValues;
        break;
      }
    }

  }


  getQueryParams() {
    let queryParams = {};

    if (this.filter['projects'] != null && this.filter['projects'].length > 0) {
      queryParams = {
        ...queryParams,
        projects: this.filter['projects'].map(e => e.id).join(',')
      }

    }

    if (this.filter['users'] != null && this.filter['users'].length > 0) {
      queryParams = {
        ...queryParams,
        users: this.filter['users'].map(e => e.id).join(',')
      }
    }

    if (this.filter['types'] != null && this.filter['types'].length > 0) {
      queryParams = {
        ...queryParams,
        types: this.filter['types'].map(e => e.value).join(',')
      }
    }

    if (this.filter['statuses'] != null && this.filter['statuses'].length > 0) {
      queryParams = {
        ...queryParams,
        statuses: this.filter['statuses'].map(e => e.value).join(',')
      }
    }

    if (this.filter['priorities'] != null && this.filter['priorities'].length > 0) {
      queryParams = {
        ...queryParams,
        priorities: this.filter['priorities'].map(e => e.value).join(',')
      }
    }

    return queryParams;

  }

}
