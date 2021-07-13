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

  allIssues;
  allCategories;

  otherCategoryName = 'OTHER';

  FILTER_PAGE_TYPES = FILTER_PAGE_TYPES;
  ISSUE_STATUSES = ISSUE_STATUSES;

  constructor(
    private issueService: IssueService,
    public filterService: FilterService,
    public format: DataFormatter,
    public kanbanDrag: KanbanDragService,
    public projectService: ProjectService
  ) {

  }

  ngOnInit(): void {
    this.filterService.resetFilter(this.projectService.selectedProject != null ? [this.projectService.selectedProject] : []);
    this.filterService.filter['types'] = this.filterService.getBoardInitTypes();
    this.loadData();

  }

  loadData() {
    let params = this.filterService.getQueryParams();
    if(params['types'] == ISSUE_TYPES.EPIC){
      params['types'] = "";
    }
    
    this.issueService.getIssues({
      ...params,
      addEpics: true
    }).subscribe(r => {
      this.allIssues = r;

      this.createCategories();

    })
  }

  // restructure issues to type=EPIC be at the top and their childIssues under
  createCategories() {
    this.allCategories = [];

    for (const issue of this.allIssues) {
      if (issue.type == ISSUE_TYPES.EPIC) {
        this.allCategories.push({
          ...issue,
          childIssues: [],
          opened: true
        });
      }
    }

    this.allCategories.push({
      id: this.otherCategoryName,
      name: this.otherCategoryName,
      verboseName: '',
      childIssues: [],
      opened: true
    });

    for (const issue of this.allIssues) {

      if (issue.type != ISSUE_TYPES.EPIC) {
        let category = this.allCategories.find(e => e.id == this.getCategoryIdForIssue(issue));
        if (category == null) {

          category = this.allCategories.find(e => e.id == this.otherCategoryName);
        }

        category.childIssues.push(issue);
      }
    }

  }

  // finds the root epic issue for a given issue. returns null if given issue has no root epic
  getCategoryIdForIssue(issue) {

    if (issue.parentIssue == null && issue.type == ISSUE_TYPES.EPIC) {
      return issue.id;
    } else if (issue.parentIssue == null && issue.type != ISSUE_TYPES.EPIC) {
      return null;
    } else {
      let parentIssue = this.allIssues.find(e => e.id == issue.parentIssue.id);
      if (parentIssue != null) {
        return this.getCategoryIdForIssue(parentIssue);
      } else return null;

    }

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
