import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-handle',
  templateUrl: './user-handle.component.html',
  styleUrls: ['./user-handle.component.scss']
})
export class UserHandleComponent implements OnInit {

  @Input()
  user;

  @Input()
  hidePhoto = false;

  @Input()
  hideUsername = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigateByUrl('/people/' + this.user.id);
  }

}
