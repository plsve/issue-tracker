import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getCrumbs(){
    // console.log(this.router.url);

    return [this.router.url];
  }
  
  navigate(link){
    // console.log(link);
    // this.router.navigateByUrl(link);
  }

}
