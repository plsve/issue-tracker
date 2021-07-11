import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueHandleComponent } from './issue-handle.component';

describe('IssueHandleComponent', () => {
  let component: IssueHandleComponent;
  let fixture: ComponentFixture<IssueHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
