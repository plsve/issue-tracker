import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePriorityBadgeComponent } from './issue-priority-badge.component';

describe('IssuePriorityBadgeComponent', () => {
  let component: IssuePriorityBadgeComponent;
  let fixture: ComponentFixture<IssuePriorityBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuePriorityBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePriorityBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
