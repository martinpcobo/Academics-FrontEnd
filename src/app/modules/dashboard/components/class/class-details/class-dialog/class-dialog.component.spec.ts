import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassDialogComponent} from './class-dialog.component';

describe('AuthenticatorDialogComponent', () => {
  let component: ClassDialogComponent;
  let fixture: ComponentFixture<ClassDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDialogComponent]
    });
    fixture = TestBed.createComponent(ClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
