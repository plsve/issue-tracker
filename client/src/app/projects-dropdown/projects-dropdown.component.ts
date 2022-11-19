import { Component, OnInit } from '@angular/core';
import { FILTER_DROPDOWN_TYPES } from '../constant/filter-dropdown-types.enum';
import { FilterService } from '../filter.service';
import { IssueService } from '../issue.service';
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
    private filterService: FilterService,
    private issueService: IssueService,
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(r => {
      this.allProjects = r;
    })
  }

  openDropdown() {

    this.isOpened = !this.isOpened;

  }

  closeDropdown(event) {
    if (this.isOpened) {
      this.isOpened = !this.isOpened;
    }
  }

  isProjectSelected(project) {
    return this.projectService.selectedProject != null && project.id == this.projectService.selectedProject.id;
  }

  selectProject(project, selection) {
    // let the click outside directive be first
    setTimeout(() => {
      this.projectService.selectedProject = selection ? project : null;
      
      this.filterService.resetFilter(this.projectService.selectedProject != null ? [this.projectService.selectedProject] : []);
      this.filterService.updateFilter(FILTER_DROPDOWN_TYPES.PROJECT, selection ? [project] : null);
      this.issueService.getIssues(this.filterService.getQueryParams()).subscribe(r => {
        this.issueService.initList(r);
        this.issueService.initBoardList(r);
        this.issueService.createBoardCategories();
      })

    }, 10);

  }

}
