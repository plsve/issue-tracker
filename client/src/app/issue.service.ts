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

  getIssues(queryParams?){
    return this.http.get<any>(this.issuesUrl, {
      params: queryParams
    });
  }

  getIssue(id){
    return this.http.get<any>(this.issuesUrl + '/' + id);
  }
}
