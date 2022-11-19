import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FILTER_PAGE_TYPES } from '../constant/filter-page-types.enum';
import { ISSUE_STATUSES } from '../constant/issue-status.enum';
import { ISSUE_TYPES } from '../constant/issue-types.enum';
import { FilterService } from '../filter.service';
import { IssueService } from '../issue.service';
import { KanbanDragService } from '../kanban-drag.service';
import { ProjectService } from '../project.service';
import { DataFormatter } from '../utils/data-formatter.utils';

@Component({
  selector: 'app-board-kanban',
  templateUrl: './board-kanban.component.html',
  styleUrls: ['./board-kanban.component.scss']
})
export class BoardKanbanComponent implements OnInit {




  FILTER_PAGE_TYPES = FILTER_PAGE_TYPES;
  ISSUE_STATUSES = ISSUE_STATUSES;

  constructor(
    public issueService: IssueService,
    public filterService: FilterService,
    public format: DataFormatter,
    public kanbanDrag: KanbanDragService,
    public projectService: ProjectService
  ) {

  }

  ngOnInit(): void {
    this.filterService.resetFilter(this.projectService.selectedProject != null ? [this.projectService.selectedProject] : []);
    this.filterService.filter['types'] = this.filterService.boardInitFilters;
    this.loadData();

  }

  loadData() {
    let params = this.filterService.getQueryParams();
    if (params['types'] == ISSUE_TYPES.EPIC) {
      params['types'] = "";
    }

    this.issueService.getIssues({
      ...params,
      addEpics: true
    }).subscribe(r => {
      this.issueService.initBoardList(r);
      this.issueService.createBoardCategories();

    })
  }


  dropdownClicked(category) {
    category.opened = !category.opened;
  }

  getFirstOrLastClass(i, maxLength) {

    if (i == 0 && maxLength == 1) {
      return 'first-issue last-issue';
    } else if (i == 0) {
      return 'first-issue'
    } else if (i == maxLength - 1) {
      return 'last-issue'
    }

    return '';
  }

  getIssuesForStatus(status, issues) {
    return issues.filter(e => e.status == status);
  }

  getCatContentClass(cat) {
    let result = '';
    if (cat.childIssues.length > 0) {
      result += 'cat-content';
    }
    return result;
  }

  getSwimlaneDraggingClass(cat) {
    return (this.kanbanDrag.isDragging && cat.id == this.kanbanDrag.category.id) ? 'cat-content-drag' : '';
  }

  // simulate drag movement
  drop(event: CdkDragDrop<string[]>, status) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.kanbanDrag.issue.status = status;
    }

    this.kanbanDrag.release();
  }

}
