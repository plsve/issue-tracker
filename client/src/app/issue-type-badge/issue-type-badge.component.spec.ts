import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTypeBadgeComponent } from './issue-type-badge.component';

describe('IssueTypeBadgeComponent', () => {
  let component: IssueTypeBadgeComponent;
  let fixture: ComponentFixture<IssueTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueTypeBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
