import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatorDialogComponent } from './authenticator-dialog.component';

describe('AuthenticatorDialogComponent', () => {
  let component: AuthenticatorDialogComponent;
  let fixture: ComponentFixture<AuthenticatorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticatorDialogComponent]
    });
    fixture = TestBed.createComponent(AuthenticatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
