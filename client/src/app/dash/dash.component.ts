import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  @ViewChild('topMenu') elementView: ElementRef;

  sideMenuClass = 'side-menu-wrap';

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

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log(window.pageYOffset);
    if(window.pageYOffset > this.elementView.nativeElement.offsetHeight){
      this.sideMenuClass = 'side-menu-fixed';
    } else {
      this.sideMenuClass = 'side-menu-wrap';
    }
    // console.log(event);
    // console.log(event.target.scrollingElement.clientTop);
  }

  getSideMenuStyle(){
    if(window.pageYOffset > this.elementView.nativeElement.offsetHeight){
      return 'side-menu-fixed';
    } else {
      return '';
    }
  }

  getPositionStyle(){
    // let pos = document.documentElement.scrollTop;
    // console.log(pos);
    // console.log(document.documentElement.scrollHeight);
    // if(pos > 0){
    //   return 'side-menu-fixed';
    // }
    
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
