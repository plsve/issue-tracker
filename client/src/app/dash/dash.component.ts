import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  project = {
    name: 'Starship-SN8'
  }

  sideMenuItems = [
    {
      name: 'Board',
      route: '/board'
    },
    {
      name: 'Issues',
      route: '/issues'
    },
    {
      name: 'People',
      route: '/users'
    },
    {
      name: 'Docs',
      route: '/docs'
    },
    {
      name: 'Logs',
      route: '/logs'
    },
    {
      name: 'Statistics',
      route: '/stats'
    },
  ]

  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sideBtnClicked(event) {
    console.log(event.target);
  }

  isRouteActive(route) {
    console.log('route');
    console.log(route);
    console.log(this.router.isActive(route, false));
    return this.router.isActive(route, false); // <-- boolean is for exactMatch
  }

}
