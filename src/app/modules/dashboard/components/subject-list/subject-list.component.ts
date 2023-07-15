import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import ToastService, {ToastType} from "../../../../services/ToastService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "../../../../../models/Subject";
import SubjectService from "../../services/SubjectService";
import {EUserDialogMode} from "../user-list/user-dialog/user-dialog.component";
import {ISubjectDialogResult, SubjectDialogComponent} from "./subject-dialog/subject-dialog.component";

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

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    await this.refreshSource();
  }

  protected async refreshSource(): Promise<void> {
    this.subject_source = new MatTableDataSource<ESubjectSource>((await this.subject_service.getAllSubjects()).map((subject_instance: Subject) => {
        return {
          id: subject_instance.getIdentifier(),
          name: subject_instance.getName(),
          subject_instance: subject_instance
        };
      })
    );
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

    dialogRef.afterClosed().subscribe(async (result: ISubjectDialogResult) => {
      if (result.subject_instance && await this.subject_service.createSubject(result.subject_instance)) {
        this.toast_service.setMessage("Subject has been created", ToastType.SUCCESS);

        await this.refreshSource();
      } else {
        this.toast_service.setMessage("Subject could not be created", ToastType.DANGER);
      }
    });
  }

  protected async handleSubjectEdit(subject_instance: Subject): Promise<void> {
    const dialogRef: MatDialogRef<SubjectDialogComponent> = this.dialog.open(SubjectDialogComponent, {
      data: {
        DIALOG_MODE: EUserDialogMode.EDIT,
        subject_instance: subject_instance
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(async (result: ISubjectDialogResult) => {
      if (result.subject_instance && await this.subject_service.modifySubject(result.subject_instance)) {
        this.toast_service.setMessage("Selected subject has been modified", ToastType.SUCCESS);

        await this.refreshSource();
      } else {
        this.toast_service.setMessage("Subject could not be modified", ToastType.DANGER);
      }
    });
  }

  protected async handleSubjectDeletion(id: String | undefined): Promise<void> {
    if (id && await this.subject_service.deleteSubject(id)) {
      this.toast_service.setMessage("Selected subject has been deleted", ToastType.SUCCESS);

      await this.refreshSource();
    } else {
      this.toast_service.setMessage("Subject could not be deleted", ToastType.DANGER);
    }
  }

}

interface ESubjectSource {
  name: String | undefined,
  id: String | undefined,
  subject_instance: Subject
}
