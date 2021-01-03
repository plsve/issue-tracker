import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  selectedProject = null;

  private projectsUrl = environment.backendUrl + 'projects'

  constructor(
    private authService: AuthService,
    private http: HttpClient
    ) { }

  getProjects(){
    return this.http.get<any>(this.projectsUrl);
  }

  getProject(id){
    return this.http.get<any>(this.projectsUrl + '/' + id);
  }
}
