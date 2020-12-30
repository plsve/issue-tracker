import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStatusBadgeComponent } from './issue-status-badge.component';

describe('IssueStatusBadgeComponent', () => {
  let component: IssueStatusBadgeComponent;
  let fixture: ComponentFixture<IssueStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueStatusBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
