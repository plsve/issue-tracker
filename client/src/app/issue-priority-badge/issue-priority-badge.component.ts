import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue-priority-badge',
  templateUrl: './issue-priority-badge.component.html',
  styleUrls: ['./issue-priority-badge.component.scss']
})
export class IssuePriorityBadgeComponent implements OnInit {

  @Input()
  priority;

  @Input()
  hideText = false;

  @Input()
  hideTooltip = false;

  constructor() { }

  ngOnInit(): void {
  }

  getStyle() {


    switch (true) {
      case this.priority < 2: return 'very-low';
      case this.priority == 2: return 'low';
      case this.priority == 3: return 'medium';
      case this.priority == 4: return 'high';
      case this.priority > 4: return 'very-high';
    }
  }

  getIcon() {

    switch (true) {
      case this.priority < 2: return 'south';
      case this.priority == 2: return 'south_east';
      case this.priority == 3: return 'east';
      case this.priority == 4: return 'north_east';
      case this.priority > 4: return 'north';
    }
  }

  getTooltip() {
    switch (true) {
      case this.priority < 2: return 'Very low';
      case this.priority == 2: return 'Low';
      case this.priority == 3: return 'Medium';
      case this.priority == 4: return 'High';
      case this.priority > 4: return 'Very high';
    }
  }

}
