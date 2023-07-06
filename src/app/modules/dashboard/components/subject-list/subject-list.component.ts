import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../models/User";
import UserService from "../../../authenticate/services/UserService";
import ToastService from "../../../../services/ToastService";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "../../../../models/Subject";
import SubjectService from "../../services/SubjectService";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  protected subject_source: MatTableDataSource<Subject> = new MatTableDataSource<Subject>([]);
  protected table_columns: string[] = ['name', 'actions'];

  constructor(protected subject_service: SubjectService, protected toast_service: ToastService, public dialog: MatDialog,) {
  }

  // Define the paginator and sort variables using the ViewChild decorator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  async ngOnInit() {
    this.subject_source = new MatTableDataSource<Subject>(await this.subject_service.getAllSubjects());
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

}
