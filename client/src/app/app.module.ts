import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { DashComponent } from './dash/dash.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { IssueService } from './issue.service';
import { DataFormatter } from './utils/data-formatter.utils';
import { IssueStatusBadgeComponent } from './issue-status-badge/issue-status-badge.component';
import { IssuePriorityBadgeComponent } from './issue-priority-badge/issue-priority-badge.component';
import { IssueTypeBadgeComponent } from './issue-type-badge/issue-type-badge.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProjectService } from './project.service';
import { BoardComponent } from './board/board.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { FilterComponent } from './filter/filter.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { UserHandleComponent } from './user-handle/user-handle.component';
import { ProjectsDropdownComponent } from './projects-dropdown/projects-dropdown.component';
import { BoardKanbanComponent } from './board-kanban/board-kanban.component';
import { KanbanIssueComponent } from './kanban-issue/kanban-issue.component';
import { IssueHandleComponent } from './issue-handle/issue-handle.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    routingComponents,
    IssueStatusBadgeComponent,
    IssuePriorityBadgeComponent,
    IssueTypeBadgeComponent,
    BreadcrumbComponent,
    BoardComponent,
    ProjectListComponent,
    FilterComponent,
    FilterDropdownComponent,
    ClickOutsideDirective,
    UserHandleComponent,
    ProjectsDropdownComponent,
    BoardKanbanComponent,
    KanbanIssueComponent,
    IssueHandleComponent,
    IssueDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ChartModule
    
  ],
  providers: [
    AuthService,
    ProjectService,
    IssueService,
    DataFormatter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
