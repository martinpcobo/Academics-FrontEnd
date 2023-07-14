import {Component, OnInit} from '@angular/core';
import ThemeService from "../../../../services/ThemeService";
import AuthenticationService from "../../../../services/AuthenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AuthenticatorService from "../../../../services/AuthenticatorService";
import Authenticator from "../../../../../models/Authenticator";
import User from "../../../../../models/User";
import AuthLoginDetails from "../../../../../models/dtos/AuthLoginDetails";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthenticatorDialogComponent} from "./authenticator-dialog/authenticator-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Properties
  protected readonly AuthLoginDetails = AuthLoginDetails;
  protected hide_password: boolean = true;

  protected change_password: FormGroup = new FormGroup({
    old_password: new FormControl<String | null>('', [Validators.required]),
    new_password: new FormControl<String | null>('', [Validators.required])
  });

  protected user_authenticators: Authenticator[] = [];
  protected user: User | null = null;

  // Constructor
  constructor(
    public dialog: MatDialog,
    protected theme_service: ThemeService,
    protected authentication_service: AuthenticationService,
    protected authenticator_service: AuthenticatorService
  ) {
  }

  // Component's Lifecycle
  async ngOnInit() {
    this.user = this.authentication_service.getUser();
    await this.refreshAuthenticators();

    this.authentication_service.getUserObserver().subscribe({
      next: async (new_user: User | null) => {
        this.user = new_user;

        await this.refreshAuthenticators();
      }, error: (error) => {
        this.user_authenticators = [];
      }
    });
  }

  // Methods - Business Logic

  public async refreshAuthenticators(): Promise<void> {
    let user_id: String | undefined = this.user?.getIdentifier();

    if (this.user && user_id) {
      this.user_authenticators = await this.authenticator_service.getAuthenticatorsFromUser(user_id);
      console.log(this.user_authenticators);
    }
  }

  protected async submitChangePassword(): Promise<void> {
    await this.authentication_service.changePassword(this.change_password.value.old_password, this.change_password.value.new_password);

    this.change_password.reset();
  }

  protected async startAuthenticatorRegistration(): Promise<void> {
    const dialogRef: MatDialogRef<AuthenticatorDialogComponent> = this.dialog.open(AuthenticatorDialogComponent, {
      data: {
        title: "Passkey name",
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      let user_id: String | undefined = this.user?.getIdentifier();
      if (this.user && user_id) {
        let auth_details: AuthLoginDetails = new AuthLoginDetails();
        auth_details.setUsername(this.user.getVerifiedEmail());
        auth_details.setAuthenticatorName(result.toString());

        await this.authentication_service.startAuthnRegistration(auth_details);

        this.user_authenticators = await this.authenticator_service.getAuthenticatorsFromUser(user_id);
      }
    });
  }

  protected parseUserRoles() : String | undefined{
    return this.user?.getRoles()?.toString().split(',').map((role) => { return role[0] + role.toLowerCase().slice(1, role.length); }).join(', ').replace('None', '');
  }
}
