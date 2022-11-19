import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ISSUE_TYPES } from './constant/issue-types.enum';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issuesUrl = environment.backendUrl + 'issues'

  issueList = [];

  boardIssueList = [];
  boardCategoryList = [];
  boardOtherCategoryName = 'OTHER';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  initList(data) {
    this.issueList = data;
    this.sortData('name', false);
  }

  initBoardList(data) {
    this.boardIssueList = data;
  }


  // restructure issues to type=EPIC be at the top and their childIssues under
  createBoardCategories() {
    this.boardCategoryList = [];

    for (const issue of this.boardIssueList) {
      if (issue.type == ISSUE_TYPES.EPIC) {
        this.boardCategoryList.push({
          ...issue,
          childIssues: [],
          opened: true
        });
      }
    }

    this.boardCategoryList.push({
      id: this.boardOtherCategoryName,
      name: this.boardOtherCategoryName,
      verboseName: '',
      childIssues: [],
      opened: true
    });

    for (const issue of this.boardIssueList) {

      if (issue.type != ISSUE_TYPES.EPIC) {
        let category = this.boardCategoryList.find(e => e.id == this.getCategoryIdForIssue(issue));
        if (category == null) {

          category = this.boardCategoryList.find(e => e.id == this.boardOtherCategoryName);
        }

        category.childIssues.push(issue);
      }
    }

  }

  // finds the root epic issue for a given issue. returns null if given issue has no root epic
  private getCategoryIdForIssue(issue) {

    if (issue.parentIssue == null && issue.type == ISSUE_TYPES.EPIC) {
      return issue.id;
    } else if (issue.parentIssue == null && issue.type != ISSUE_TYPES.EPIC) {
      return null;
    } else {
      let parentIssue = this.boardIssueList.find(e => e.id == issue.parentIssue.id);
      if (parentIssue != null) {
        return this.getCategoryIdForIssue(parentIssue);
      } else return null;

    }

  }

  // TODO add sensible sorts specific for issue table - assignee, type, status, 
  sortData(name, asc) {
    this.issueList.sort((a, b) => {
      if (asc) {
        return a[name] < b[name] ? -1 : 0;
      } else {
        return a[name] > b[name] ? -1 : 1;
      }

    })
  }

  getIssues(queryParams?) {
    return this.http.get<any>(this.issuesUrl, {
      params: queryParams
    });
  }

  getIssue(id) {
    return this.http.get<any>(this.issuesUrl + '/' + id);
  }

  updateIssue(issue) {
    return this.http.put<any>(this.issuesUrl + '/' + issue.id,
      this.getUpdateIssueDTO(issue));
  }

  getUpdateIssueDTO(issue) {

    return {
      verboseName: issue.verboseName,
      type: issue.type,
      description: issue.description,
      status: issue.status,
      priority: +issue.priority,
      resolved: issue.resolved,
      hoursEstimated: +issue.hoursEstimated,
      hoursRemaining: +issue.hoursRemaining,
      hoursSpent: +issue.hoursSpent,
      gitLink: issue.gitLink,
      projectId: issue.project.id,
      userId: issue.user.id,
      childIssueIds: issue.childIssues.map(e => e.id),
      commentPostIds: issue.commentPosts.map(e => e.id),
      parentIssueId: issue.parentIssue.id,
      editedByUserId: issue.editedByUser.id,
    }
  }
}
