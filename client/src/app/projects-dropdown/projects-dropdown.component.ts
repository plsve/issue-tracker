import { Component, OnInit } from '@angular/core';
import { FILTER_DROPDOWN_TYPES } from '../constant/filter-dropdown-types.enum';
import { FilterService } from '../filter.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects-dropdown',
  templateUrl: './projects-dropdown.component.html',
  styleUrls: ['./projects-dropdown.component.scss']
})
export class ProjectsDropdownComponent implements OnInit {

  isOpened = false;
  allProjects = [];

  constructor(
    public projectService: ProjectService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(r => {
      this.allProjects = r;
      this.allProjects = this.allProjects.concat(this.allProjects);    
      this.allProjects = this.allProjects.concat(this.allProjects);    
      this.allProjects = this.allProjects.concat(this.allProjects);    
      this.allProjects = this.allProjects.concat(this.allProjects);    
      this.allProjects = this.allProjects.concat(this.allProjects);    
    })
  }

  openDropdown() {
    console.log('openDropdown');
    console.log(this.isOpened);
    
    
    this.isOpened = !this.isOpened;

  }

  closeDropdown(event) {
    if (this.isOpened) {
      console.log('closeDropdown');
      this.isOpened = !this.isOpened;
    }
  }

  isProjectSelected(project){
    return this.projectService.selectedProject != null && project.id == this.projectService.selectedProject.id;
  }

  selectProject(project, selection){
    // let the click outside directive be first
    setTimeout(() => {
      this.projectService.selectedProject = selection ? project : null;
      if(selection){
        this.filterService.updateFilter(FILTER_DROPDOWN_TYPES.PROJECT, [project]);
      } else {
        this.filterService.updateFilter(FILTER_DROPDOWN_TYPES.PROJECT, null);
      }
      
    }, 10);
    
  }

}
