import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDropdownComponent } from './projects-dropdown.component';

describe('ProjectsDropdownComponent', () => {
  let component: ProjectsDropdownComponent;
  let fixture: ComponentFixture<ProjectsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
