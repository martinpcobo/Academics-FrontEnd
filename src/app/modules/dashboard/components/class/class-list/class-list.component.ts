import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import ToastService, {ToastType} from "../../../../../services/ToastService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "../../../../../../models/Subject";
import {Professor} from "../../../../../../models/Professor";
import {Student} from "../../../../../../models/Student";
import {Grade} from "../../../../../../models/Grade";
import ClassService from "../../../services/ClassService";
import {Class} from "../../../../../../models/Class";
import {ClassDialogComponent, EClassDialogMode, IClassDialogResult} from "../class-details/class-dialog/class-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent {
  protected class_source: MatTableDataSource<IClassSource> = new MatTableDataSource<IClassSource>([]);
  protected table_columns: string[] = ['subject', 'startDate', 'endDate', 'name', 'description', 'professors', 'actions'];

  constructor(
    private class_service: ClassService,
    protected toast_service: ToastService,
    protected dialog: MatDialog,
    private router: Router
  ) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    await this.refreshSource();
  }

  async ngAfterViewInit() {
    this.class_source.paginator = this.paginator;
    this.class_source.sort = this.sort;
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.class_source.filter = filterValue.trim().toLowerCase();

    if (this.class_source.paginator) {
      this.class_source.paginator.firstPage();
    }
  }

  private async refreshSource(): Promise<void> {

    this.class_source.data = (await this.class_service.getAllClasses()).map((class_instance: Class) => {
      return {
        id: class_instance.getIdentifier(),
        subject: class_instance.getSubject(),
        startDate: class_instance.getStartDate(),
        endDate: class_instance.getEndDate(),
        name: class_instance.getName(),
        description: class_instance.getDescription(),
        professors: class_instance.getProfessors(),
        students: class_instance.getStudents(),
        grades: class_instance.getGrades(),

        class_instance
      };
    });
  }

  protected async handleClassCreation(): Promise<void> {
    const dialogRef: MatDialogRef<ClassDialogComponent> = this.dialog.open(ClassDialogComponent, {
      data: {
        DIALOG_MODE: EClassDialogMode.CREATE,
        class_instance: undefined
      },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(async (result: IClassDialogResult) => {
      if (
        result &&
        result.class_instance &&
        await this.class_service.createClass(result.class_instance)
      ) {
        this.toast_service.setMessage("Class has been created", ToastType.SUCCESS);
        await this.refreshSource();
      } else {
        this.toast_service.setMessage("Class could not be created", ToastType.DANGER);
      }
    });
  }

  protected async handleClassDeletion(id: String): Promise<void> {
    if (await this.class_service.deleteClass(id)) {
      this.toast_service.setMessage("Class has been deleted", ToastType.SUCCESS);

      await this.refreshSource();
    } else {
      this.toast_service.setMessage("Class could not be deleted", ToastType.DANGER);
    }
  }

  protected async handleClassEdition(class_instance: Class): Promise<void> {
    this.router.navigate(['/home/class/' + class_instance.getIdentifier()]);
  }
}

interface IClassSource {
  id: String | undefined;
  subject: Subject | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  name: String | undefined;
  description: String | undefined
  professors: Professor[] | undefined;
  students: Student[] | undefined;
  grades: Grade[] | undefined;
  class_instance: Class
}
