import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubjectDialogComponent} from './subject-dialog.component';

describe('AuthenticatorDialogComponent', () => {
  let component: SubjectDialogComponent;
  let fixture: ComponentFixture<SubjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectDialogComponent]
    });
    fixture = TestBed.createComponent(SubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
