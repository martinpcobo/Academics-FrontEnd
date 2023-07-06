import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../../models/User";
import UserService from "../../../../services/UserService";
import ToastService from "../../../../services/ToastService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "../../../../../models/Subject";
import SubjectService from "../../services/SubjectService";
import {EUserDialogMode, UserDialogComponent} from "../user-list/user-dialog/user-dialog.component";
import {ToastType} from "../../../../components/toast/toast.component";
import {SubjectDialogComponent} from "./subject-dialog/subject-dialog.component";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent {
  protected subject_source: MatTableDataSource<ESubjectSource> = new MatTableDataSource<ESubjectSource>([]);
  protected table_columns: string[] = ['name', 'actions'];

  constructor(protected subject_service: SubjectService, protected toast_service: ToastService, public dialog: MatDialog,) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    await this.refreshSource();
  }

  protected async refreshSource(): Promise<void> {
    this.subject_source = new MatTableDataSource<ESubjectSource>();
    (await this.subject_service.getAllSubjects()).forEach((subject_instance: Subject) => {
      this.subject_source.data.push({
        id: subject_instance.getIdentifier(),
        name: subject_instance.getName()
      })
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.subject_source.paginator = this.paginator;
    this.subject_source.sort = this.sort;
  }

  protected applyFilter(event: Event): void {
    const filterValue: String = (event.target as HTMLInputElement).value;
    this.subject_source.filter = filterValue.trim().toLowerCase();

    if (this.subject_source.paginator) {
      this.subject_source.paginator.firstPage();
    }
  }

  protected async handleSubjectCreation(): Promise<void> {
    const dialogRef: MatDialogRef<SubjectDialogComponent> = this.dialog.open(SubjectDialogComponent, {
      data: {
        DIALOG_MODE: EUserDialogMode.CREATE,
        subject_instance: undefined
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(async (result: {
      subject_instance: Subject | undefined
    }) => {
      if (result.subject_instance && await this.subject_service.createSubject(result.subject_instance)) {
        this.toast_service.setMessage("User creation successful", "User has been created.", ToastType.SUCCESS);

        this.user_source = new MatTableDataSource<User>(await this.user_service.getUsers());
      } else {
        this.toast_service.setMessage("User creation failed", "User could not be created.", ToastType.DANGER);
      }
    });
  }


  protected async handleSubjectEdit(id: String | undefined): Promise<void> {
    throw new Error();
  }

  protected async handleSubjectDeletion(id: String | undefined): Promise<void> {
    throw new Error();
  }

}

interface ESubjectSource {
  name: String | undefined,
  id: String | undefined
}
