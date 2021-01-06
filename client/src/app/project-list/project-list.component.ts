import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectService } from '../project.service';
import { DataFormatter } from '../utils/data-formatter.utils';
import { ISSUE_TYPES } from '../constant/issue-types.enum';
import { ISSUE_STATUSES } from '../constant/issue-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList = [];
  hoveringOnHeader = false;

  public ISSUE_STATUSES = ISSUE_STATUSES;

  columnData = [{
    text: 'Name',
    name: 'name',
  }, {
    text: 'Prefix',
    name: 'prefix',
  }, {
    text: 'Created',
    name: 'created',
  }, {
    text: 'Participants',
    name: 'userCount',
  }, {
    text: 'Issues total',
    name: 'issueCount',
  }, {
    text: 'Open',
    name: 'openIssueCount',
  }, {
    text: 'In progress',
    name: 'inProgressIssueCount',
  }, {
    text: 'Done',
    name: 'doneIssueCount',
  }, {
    text: 'Comments',
    name: 'commentCount',
  }, {
    text: 'Work days',
    name: 'workDaySum',
  }, {
    text: 'Doc pages',
    name: 'docPageCount',
  }, {
    text: 'Selected',
    name: 'selected',
  }
  ]

  constructor(
    public projectService: ProjectService,
    public format: DataFormatter,
    private router: Router,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {

    iconRegistry.addSvgIcon('sort-up', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sort-arrow-up.svg'));
    iconRegistry.addSvgIcon('sort-down', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sort-arrow-down.svg'));
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(r => {
      this.projectList = r;
    })
  }

  onHoverHeader(mouseOn) {
    this.hoveringOnHeader = mouseOn;
  }

  getIssueCount(issues, status) {
    return issues.filter(e => e.status == status).length;
  }

  getCommentCount(project) {
    return project.issues.reduce((count, current) => count + current.commentPosts.length, 0);
  }

  getWorkDaySum(project) {
    let workedHoursSum =  project.issues.reduce((totalSum, currentIssue) => totalSum +
      currentIssue.commentPosts.reduce((commentSum, currentComment) => commentSum + +currentComment.workedHours, 0)
      , 0);
      return this.format.getWorkTime(workedHoursSum, true);
  }

  getDocPageCount(project) {
    return project.docFolders.reduce((count, current) => count + current.docPages.length, 0);
  }

  routeToPeople(projectName){
    this.router.navigate(['projects', projectName, 'people'])
  }

  routeToIssues(projectName, status?){
    this.router.navigate(['projects', projectName, 'issues', {status: status}])
  }

  routeToComments(projectName){

  }

  get

}
