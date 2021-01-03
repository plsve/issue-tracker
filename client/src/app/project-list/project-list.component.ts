import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList = [];

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(r => {
      this.projectList = r;
      console.log(this.projectList);
    })
  }

}
