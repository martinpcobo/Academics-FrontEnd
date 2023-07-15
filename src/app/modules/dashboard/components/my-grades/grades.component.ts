import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../../models/User";
import UserService from "../../../../services/UserService";
import ToastService from "../../../../services/ToastService";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Grade} from "../../../../../models/Grade";
import GradeService from "../../services/GradeService";
import AuthenticationService from "../../../../services/AuthenticationService";

@Component({
  selector: 'app-my-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent {
  protected grade_source: MatTableDataSource<IGradeSource> = new MatTableDataSource<IGradeSource>([]);
  protected table_columns: string[] = ['subject', 'grade'];

  constructor(
    protected user_service: UserService,
    private authentication_service: AuthenticationService,
    protected toast_service: ToastService,
    protected grades_service: GradeService,
    public dialog: MatDialog
  ) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    this.authentication_service.getUserObserver().subscribe(async (user: User | null) => {
      let student_id: String | undefined = user?.getIdentifier();
      if (student_id) {
        await this.refreshGradeSource(student_id);
      }
    })
    let student_id: String | undefined = this.authentication_service.getUser()?.getIdentifier();
    if (student_id) {
      await this.refreshGradeSource(student_id);
    }
  }

  private async refreshGradeSource(student_id: String): Promise<void> {
    let grade_instances: IGradeSource[] = [];
    (await this.grades_service.getGradesFromStudent(student_id)).forEach((grade_instance: Grade) => {
      console.log(grade_instance);
      grade_instances.push({
        id: grade_instance.getIdentifier(),
        subject: grade_instance.getCourse()?.getSubject()?.getName(),
        grade: grade_instance.getValue(),
        grade_instance
      })
    })

    this.grade_source = new MatTableDataSource<IGradeSource>(grade_instances);
  }

  async ngAfterViewInit() {
    this.grade_source.paginator = this.paginator;
    this.grade_source.sort = this.sort;
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.grade_source.filter = filterValue.trim().toLowerCase();

    if (this.grade_source.paginator) {
      this.grade_source.paginator.firstPage();
    }
  }
}


interface IGradeSource {
  id: String | undefined,
  subject: String | undefined,
  grade: Number | undefined,
  grade_instance: Grade
}
