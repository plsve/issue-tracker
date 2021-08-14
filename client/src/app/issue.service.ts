import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issuesUrl = environment.backendUrl + 'issues'

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

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
