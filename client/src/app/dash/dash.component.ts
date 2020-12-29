import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  sideMenuItems = [
    {
      name: 'Board'
    },
    {
      name: 'Issues'
    },
    {
      name: 'People'
    },
    {
      name: 'Docs'
    },
    {
      name: 'Logs'
    },
    {
      name: 'Statistics'
    },
  ]

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
