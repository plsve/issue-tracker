import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHandleComponent } from './user-handle.component';

describe('UserHandleComponent', () => {
  let component: UserHandleComponent;
  let fixture: ComponentFixture<UserHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
