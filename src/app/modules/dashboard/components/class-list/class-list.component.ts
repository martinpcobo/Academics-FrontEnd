import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../models/User";
import UserService from "../../../authenticate/services/UserService";
import ToastService from "../../../../services/ToastService";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {
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
}
