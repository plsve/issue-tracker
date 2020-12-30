import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
      route: '/people'
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

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  sideBtnClicked(event) {
    console.log(event.target);
  }

  isRouteActive(route) {
    return this.router.isActive(route, false); // <-- boolean is for exactMatch
  }

  login() {
    if (!this.authService.user) {
      this.authService.login({ username: "pavel.vodicka", password: "heslo" });
    }
  }

}
