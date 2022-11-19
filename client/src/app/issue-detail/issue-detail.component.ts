import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartComponent } from 'angular2-chartjs';
import { FILTER_DROPDOWN_TYPES } from '../constant/filter-dropdown-types.enum';
import { ISSUE_TYPES } from '../constant/issue-types.enum';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  issue;
  ISSUE_TYPES = ISSUE_TYPES;

  chartData;
  chartType;
  chartOptions;

  editMode = false;
  hoveringEdit = false;

  newSubIssue;

  FILTER_DROPDOWN_TYPES = FILTER_DROPDOWN_TYPES;

  files = ['report1.txt', 'report2.txt'];


  constructor(
    public issueService: IssueService,
    public router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit(): void {
    this.issueService.getIssue(this.route.snapshot.params['id']).subscribe(r => {
      this.issue = r;
      this.setupProgressChart();
    })
  }

  editSaveClicked() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.hoveringEdit = false;
      this.newSubIssue = null;

      this.issueService.updateIssue(this.issue).subscribe(r => {

      })

    }
  }

  removeSubIssueClicked(subIssue) {
    this.issue.childIssues = this.issue.childIssues.filter(e => e.id != subIssue.id);
  }

  newSubIssueConfirmed(event) {
    this.issue.childIssues.push(event);
    this.newSubIssue = null;

  }

  addSubIssueClicked() {
    this.newSubIssue = {

    };
  }

  getIssuesWrapClass() {
    let result = '';
    if (this.hoveringEdit == true) {
      result += 'highlighted-border';
    }
    if (this.newSubIssue != null) {

      result += ' adding-sub-issue';
    }

    return result;
  }

  isEstimationFilled() {
    return this.issue.hoursEstimated != null && +this.issue.hoursEstimated > 0;
  }

  getProgressPercent() {
    if (this.issue != null && +this.issue.hoursEstimated > 0) {
      return Math.floor((+this.issue.hoursSpent / +this.issue.hoursEstimated) * 100);
    }
    return 0;
  }

  private setupProgressChart() {



    this.chartType = 'doughnut';
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
    };

    if (this.isEstimationFilled()) {

      let progress = this.getProgressPercent();

      if (progress <= 100) {
        this.chartData = {
          labels: ['Hours estimated', 'Hours spent'],
          datasets: [{
            data: [+this.issue.hoursEstimated - +this.issue.hoursSpent, +this.issue.hoursSpent],
            backgroundColor: [
              'rgba(54, 162, 235, 0.1)',
              'rgba(54, 200, 54, 0.7)',
            ]
          }]
        };
      } else if (progress > 100) {
        this.chartData = {
          labels: ['Hours estimated', 'Hours underestimated'],
          datasets: [{
            data: [+this.issue.hoursEstimated, +this.issue.hoursSpent - +this.issue.hoursEstimated],
            backgroundColor: [
              'rgba(54, 200, 54, 0.4)',
              'rgba(215, 192, 104, 0.8)',
            ]
          }]
        };
      }

    } else {
      // hour estimation missing, draw empty chart
      this.chartData = {
        labels: ['Estimate hours to initiate chart'],
        datasets: [{
          data: [1],
          backgroundColor: [
            'rgba(54, 54, 54, 0.1)',
          ]
        }]
      };

      this.chartOptions = {
        ...this.chartOptions,
        tooltips: {
          displayColors: false,
          callbacks: {
            label: (() => {
              return 'Estimate hours to init the progress chart';
            })
          }
        }
      }

    }
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
