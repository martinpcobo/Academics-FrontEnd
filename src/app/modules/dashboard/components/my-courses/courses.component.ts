import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import UserService from "../../../../services/UserService";
import AuthenticationService from "../../../../services/AuthenticationService";
import ToastService from "../../../../services/ToastService";
import GradeService from "../../services/GradeService";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import User from "../../../../../models/User";
import {Grade} from "../../../../../models/Grade";
import {Professor} from "../../../../../models/Professor";
import {Class} from "../../../../../models/Class";
import ClassService from "../../services/ClassService";

@Component({
  selector: 'app-my-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  protected class_source: MatTableDataSource<IClassSource> = new MatTableDataSource<IClassSource>([]);
  protected table_columns: string[] = ['subject', 'startDate', 'endDate', 'professors'];

  constructor(
    protected user_service: UserService,
    private authentication_service: AuthenticationService,
    protected toast_service: ToastService,
    protected grades_service: GradeService,
    private class_service: ClassService,
    public dialog: MatDialog
  ) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    this.authentication_service.getUserObserver().subscribe(async (user: User | null) => {
      let student_id: String | undefined = user?.getIdentifier();
      if(student_id) {
        await this.refreshClassSource(student_id);
      }
    })
    let student_id: String | undefined = this.authentication_service.getUser()?.getIdentifier();
    if(student_id) {
      await this.refreshClassSource(student_id);
    }
  }

  private async refreshClassSource(student_id: String): Promise<void> {
    let class_instances: IClassSource[] = [];
    (await this.class_service.getClassesFromStudent(student_id)).forEach((class_instance: Class) => {
      console.log(class_instance);
      class_instances.push({
        id: class_instance.getIdentifier(),
        subject: class_instance.getSubject()?.getName(),
        professors: class_instance.getProfessors(),
        startDate: class_instance.getStartDate(),
        endDate: class_instance.getEndDate(),
        class_instance
      })
    })

    this.class_source = new MatTableDataSource<IClassSource>(class_instances);
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
}

interface IClassSource {
  id: String | undefined,
  subject: String | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  professors: Professor[] | undefined,
  class_instance: Class
}
