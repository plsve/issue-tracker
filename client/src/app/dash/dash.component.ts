import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MockData } from '../constant/mock-data.const';
import { FilterService } from '../filter.service';
import { KanbanDragService } from '../kanban-drag.service';
import { ProjectService } from '../project.service';
import { ProjectsDropdownComponent } from '../projects-dropdown/projects-dropdown.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  @ViewChild('topMenu') elementView: ElementRef;

  @ViewChild(ProjectsDropdownComponent) projectsDropdownComponent: ProjectsDropdownComponent;

  sideMenuClass = 'side-menu-wrap';

  project = {
    name: 'Starship-SN8'
  }

  sideMenuItems = [
    {
      name: 'Board',
      route: '/board'
    },
    {
      name: 'Issues',
      route: '/issues'
    },
    {
      name: 'People',
      route: '/people'
    },
    {
      name: 'Docs',
      route: '/docs'
    },
    {
      name: 'Logs',
      route: '/logs'
    },
    {
      name: 'Statistics',
      route: '/stats'
    },
  ]

  panelOpenState = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    public projectService: ProjectService,
    public filterService: FilterService,
    public kanbanDrag: KanbanDragService,
  ) { }

  ngOnInit(): void {
    this.projectService.selectedProject = MockData.selectedProject;
    this.filterService.filter = {
      projects: this.projectService.selectedProject != null ? [this.projectService.selectedProject] : []
    }
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    if (window.pageYOffset > this.elementView.nativeElement.offsetHeight) {
      this.sideMenuClass = 'side-menu-fixed';
    } else {
      this.sideMenuClass = 'side-menu-wrap';
    }
  }

  getSideMenuStyle() {
    if (window.pageYOffset > this.elementView.nativeElement.offsetHeight) {
      return 'side-menu-fixed';
    } else {
      return '';
    }
  }

  sideBtnClicked(event) {
  }

  isRouteActive(route) {
    return this.router.isActive(route, false); // <-- boolean is for exactMatch
  }

  login() {
    if (!this.authService.user) {
      this.authService.login({ username: "pavel.vodicka", password: "heslo" });
    }
  }

  openProjectsDropdown() {
    setTimeout(() => {
      this.projectsDropdownComponent.openDropdown();
    }, 10);
  }

}
