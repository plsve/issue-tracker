import { DOCUMENT } from '@angular/common';
import { Inject, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from 'angular2-chartjs';
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


  files = ['report1.txt', 'report2.txt'];


  constructor(
    public issueService: IssueService,
    public router: Router,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit(): void {
    // console.log(this.router.paramMap.get('id'));


    this.issueService.getIssue(2).subscribe(r => {
      this.issue = r;

      this.setupProgressChart();



    })
  }

  isEstimationFilled() {
    console.log(this.issue.hoursEstimated != null && +this.issue.hoursEstimated > 0);
    console.log();


    return this.issue.hoursEstimated != null && +this.issue.hoursEstimated > 0;
  }

  getProgressPercent() {
    if (this.issue != null) {
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
      console.log(progress);

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
