import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import UserService from "../../../../services/UserService";
import User, {EUserRoles} from "../../../../../models/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EUserDialogMode, IUserDialogResult, UserDialogComponent} from "./user-dialog/user-dialog.component";
import ToastService, {ToastType} from "../../../../services/ToastService";
import ProfessorService from "../../services/ProfessorService";
import StudentService from "../../services/StudentService";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  protected user_source: MatTableDataSource<IUserSource> = new MatTableDataSource<IUserSource>([]);
  protected table_columns: string[] = ['name', 'last_name', 'email', 'actions'];

  constructor(
    private user_service: UserService,
    private toast_service: ToastService,
    private professor_service: ProfessorService,
    private student_service: StudentService,
    public dialog: MatDialog
  ) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit(): Promise<void> {
    await this.refreshUserSource();
  }

  private async refreshUserSource(): Promise<void> {
    let user_instances: IUserSource[] = [];
    (await this.user_service.getUsers()).forEach((user_instance: User) => {
      user_instances.push({
        id: user_instance.getIdentifier(),
        first_name: user_instance.getFirstName(),
        last_name: user_instance.getLastName(),
        email: user_instance.getVerifiedEmail(),
        user_instance
      });
    })

    this.user_source = new MatTableDataSource<IUserSource>(user_instances);
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

    dialogRef.afterClosed().subscribe(async (result: IUserDialogResult) => {
      if (!result || !result.user_instance) return;

      let user_instance: User = await this.user_service.createUser(result.user_instance, result.password);
      let user_id: String | undefined = user_instance.getIdentifier();

      this.toast_service.setMessage("User has been created", ToastType.SUCCESS);

      if (user_id && result.is_professor) await this.professor_service.createProfessorProfile(user_id);
      if (user_id && result.is_student) await this.student_service.createStudentProfile(user_id);

      await this.refreshUserSource();
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

    dialogRef.afterClosed().subscribe(async (result: IUserDialogResult) => {
      if (!result || !result.user_instance) return;

      let user_id: String | undefined = result.user_instance.getIdentifier();
      if (user_id && await this.user_service.modifyUser(result.user_instance)) {
        this.toast_service.setMessage("Selected user modified successfully", ToastType.SUCCESS);

        if (result.is_professor && user_instance.getRoles()?.indexOf(EUserRoles.PROFESSOR) == -1) {
          await this.professor_service.createProfessorProfile(user_id);
        }

        if (!result.is_professor && user_instance.getRoles()?.indexOf(EUserRoles.PROFESSOR) != -1) {
          await this.professor_service.deleteProfessorProfile(user_id);
        }

        if (result.is_student && user_instance.getRoles()?.indexOf(EUserRoles.STUDENT) == -1) {
          await this.student_service.createStudentProfile(user_id);
        }

        if (!result.is_student && user_instance.getRoles()?.indexOf(EUserRoles.STUDENT) != -1) {
          await this.student_service.deleteStudentProfile(user_id);
        }

        await this.refreshUserSource();
      } else {
        this.toast_service.setMessage("Could not modify the selected user", ToastType.DANGER);
      }
    });
  }

  protected async handleUserDeletion(user_id: String): Promise<void> {
    if (await this.user_service.deleteUser(user_id)) {
      this.toast_service.setMessage("Selected user deleted successfully", ToastType.SUCCESS);

      await this.refreshUserSource();
    } else {
      this.toast_service.setMessage("Selected user deleted successfully", ToastType.DANGER);
    }
  }
}

interface IUserSource {
  id: String | undefined,
  first_name: String | undefined,
  last_name: String | undefined,
  email: String | undefined,
  user_instance: User
}
