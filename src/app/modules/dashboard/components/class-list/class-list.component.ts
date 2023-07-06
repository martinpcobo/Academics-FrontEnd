import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../../models/User";
import UserService from "../../../../services/UserService";
import ToastService from "../../../../services/ToastService";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "../../../../../models/Subject";
import {Professor} from "../../../../../models/Professor";
import {Student} from "../../../../../models/Student";
import {Grade} from "../../../../../models/Grade";
import ClassService from "../../services/ClassService";
import {Class} from "../../../../../models/Class";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent {
  protected class_source: MatTableDataSource<IClassSource> = new MatTableDataSource<IClassSource>([]);
  protected table_columns: string[] = ['subject', 'startDate', 'endDate', 'name', 'description', 'professors'];

  constructor(private class_service: ClassService, protected toast_service: ToastService, public dialog: MatDialog,) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    (await this.class_service.getAllClasses()).forEach((class_instance: Class) => {
      this.class_source.data.push({
        id: class_instance.getIdentifier(),
        subject: class_instance.getSubject(),
        startDate: class_instance.getStartDate(),
        endDate: class_instance.getEndDate(),
        name: class_instance.getName(),
        description: class_instance.getDescription(),
        professors: class_instance.getProfessors(),
        students: class_instance.getStudents(),
        grades: class_instance.getGrades(),
      })
    })
    this.class_source = new MatTableDataSource<IClassSource>();
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

  protected async handleClassCreation(): Promise<void> {
    throw new Error();
  }

  protected async handleClassDeletion(id: String): Promise<void> {
    throw new Error();
  }

  protected async handleClassEdition(id: String): Promise<void> {
    throw new Error();
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
}
