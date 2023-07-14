import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import UserService from "../../../../services/UserService";
import User from "../../../../../models/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EUserDialogMode, UserDialogComponent} from "./user-dialog/user-dialog.component";
import ToastService, {ToastType} from "../../../../services/ToastService";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  protected user_source: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  protected table_columns: string[] = ['name', 'last_name', 'email', 'actions'];

  constructor(protected user_service: UserService, protected toast_service: ToastService, public dialog: MatDialog,) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    this.user_source = new MatTableDataSource<User>(await this.user_service.getUsers());
  }

  async ngAfterViewInit() {
    this.user_source.paginator = this.paginator;
    this.user_source.sort = this.sort;
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.user_source.filter = filterValue.trim().toLowerCase();

    if (this.user_source.paginator) {
      this.user_source.paginator.firstPage();
    }
  }

  protected async handleUserCreation(): Promise<void> {
    const dialogRef: MatDialogRef<UserDialogComponent> = this.dialog.open(UserDialogComponent, {
      data: {
        DIALOG_MODE: EUserDialogMode.CREATE,
        user_instance: undefined
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(async (result: {
      user_instance: User | undefined,
      password: String
    }) => {
      if (result.user_instance && await this.user_service.createUser(result.user_instance, result.password)) {
        this.toast_service.setMessage("User has been created", ToastType.SUCCESS);

        this.user_source = new MatTableDataSource<User>(await this.user_service.getUsers());
      } else {
        this.toast_service.setMessage("User could not be created", ToastType.DANGER);
      }
    });
  }

  protected async handleUserEdition(user_instance: User): Promise<void> {
    const dialogRef: MatDialogRef<UserDialogComponent> = this.dialog.open(UserDialogComponent, {
      data: {
        DIALOG_MODE: EUserDialogMode.EDIT,
        user_instance: user_instance
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(async (result: { user_instance: User | null, password: String }) => {
      if (result.user_instance && await this.user_service.modifyUser(result.user_instance)) {
        this.toast_service.setMessage("Selected user modified successfully", ToastType.SUCCESS);

        this.user_source = new MatTableDataSource<User>(await this.user_service.getUsers());
      } else {
        this.toast_service.setMessage("Could not modify the selected user", ToastType.DANGER);
      }
    });
  }

  protected async handleUserDeletion(user_id: String): Promise<void> {
    if (await this.user_service.deleteUser(user_id)) {
      this.toast_service.setMessage("Selected user deleted successfully", ToastType.SUCCESS);

      this.user_source = new MatTableDataSource<User>(await this.user_service.getUsers());
    } else {
      this.toast_service.setMessage("Selected user deleted successfully", ToastType.DANGER);
    }
  }
}
