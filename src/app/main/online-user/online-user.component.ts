import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'app/services/user.service';

export interface UserData {
  id: string;
  name: string;
  pseduo: string;
  email: string;
  state: number;
  image_state: number;
}

@Component({
  selector: 'app-online-user',
  templateUrl: './online-user.component.html',
  styleUrls: ['./online-user.component.scss']
})

export class OnlineUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'pseduo', 'email', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public userService: UserService
  ) {
       // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.getOnlineUser();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getOnlineUser(): void {
    this.userService.getOnlineUser().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      }
    )
  }

  public lockUser(id) {
    return this.userService.lockUser(id).subscribe(
      (res) => {
        if(res.message == 'Success updated!') {
          location.reload();
        }
      }
    )
  }

  public blockUser(id) {
    return this.userService.blockUser(id).subscribe(
      (res) => {
        if(res.message == 'Success updated!') {
          location.reload();
        }
      }
    );
  }
}

