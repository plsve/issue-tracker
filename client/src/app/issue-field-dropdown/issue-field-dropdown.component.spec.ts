import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFieldDropdownComponent } from './issue-field-dropdown.component';

describe('IssueFieldDropdownComponent', () => {
  let component: IssueFieldDropdownComponent;
  let fixture: ComponentFixture<IssueFieldDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueFieldDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFieldDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
