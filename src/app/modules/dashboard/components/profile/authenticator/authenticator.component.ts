import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Authenticator from "../../../../../../models/Authenticator";
import AuthenticatorService from "../../../../../services/AuthenticatorService";
import AuthenticationService from "../../../../../services/AuthenticationService";
import User from "../../../../../../models/User";
import {AuthenticatorDialogComponent} from "../authenticator-dialog/authenticator-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {
  @Input()
  public authenticator: Authenticator | null = null;
  @Output()
  public refreshAuthenticators: EventEmitter<null> = new EventEmitter<null>();

  private user: User | null = null

  constructor(
    public dialog: MatDialog,
    private authenticator_service: AuthenticatorService,
    private authentication_service: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.user = this.authentication_service.getUser();

    this.authentication_service.getUserObserver().subscribe({
      next: (new_user: User | null) => {
        this.user = new_user;
      },
      error: (error) => {
        this.user = null;
      },
    });
  }

  async handleAuthenticatorNameChange() {
    const dialogRef: MatDialogRef<AuthenticatorDialogComponent> = this.dialog.open(AuthenticatorDialogComponent, {
      data: {
        title: "New Passkey name",
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      let user_id: String | undefined = this.user?.getIdentifier();

      if (this.user && this.authenticator && user_id) {
        await this.authenticator_service.modifyAuthenticatorName(this.authenticator.getIdentifier(), user_id, result.toString());
        this.refreshAuthenticators.emit(null);
      } else {
        console.log("Could not find the Authenticator to modify or the User who owns it.");
      }
    })
  }

  async handleAuthenticatorDelete() {
    let user_id: String | undefined = this.user?.getIdentifier();
    if (this.authenticator && this.user && user_id) {
      await this.authenticator_service.removeAuthenticator(this.authenticator.getIdentifier(), user_id)

      this.refreshAuthenticators.emit(null);
    } else {
      console.log("Failed to delete authenticator!");
    }
  }
}
