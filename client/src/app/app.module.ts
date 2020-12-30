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

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    routingComponents,
    IssueStatusBadgeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    IssueService,
    DataFormatter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
