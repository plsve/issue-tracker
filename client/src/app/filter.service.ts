import { Injectable } from '@angular/core';
import { FILTER_DROPDOWN_TYPES } from './constant/filter-dropdown-types.enum';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter = {};

  constructor() { }

  resetFilter(){
    this.filter = {};
  }

  updateFilter(type, selectedValues){
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
    }

  }

  getQueryParams(){
    console.log('getQueryParams');
    console.log(this.filter);
    
    let queryParams = {};

    if(this.filter['projects'] != null && this.filter['projects'].length > 0){
      queryParams = {
        ...queryParams,
        projects: this.filter['projects'].map(e => e.id).join(',')
      }
      
    }

    if(this.filter['users'] != null && this.filter['users'].length > 0){
      queryParams = {
        ...queryParams,
        users: this.filter['users'].map(e => e.id).join(',')
      }
    }

    if(this.filter['types'] != null && this.filter['types'].length > 0){
      queryParams = {
        ...queryParams,
        types: this.filter['types'].map(e => e.value).join(',')
      }
    }

    if(this.filter['statuses'] != null && this.filter['statuses'].length > 0){
      queryParams = {
        ...queryParams,
        statuses: this.filter['statuses'].map(e => e.value).join(',')
      }
    }
    

    return queryParams;

  }

}
