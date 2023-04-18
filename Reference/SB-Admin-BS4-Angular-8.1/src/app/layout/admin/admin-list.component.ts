import { Component, OnInit } from '@angular/core';
import { Admin } from '../../core/model/admin';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { AdminService } from '../../core/service/admin.service';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DialogService } from '@progress/kendo-angular-dialog';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  admin: Admin[] = [];
  selectedAdmin?: Admin;

  public admingrid: Observable<GridDataResult>;
  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: { logic: 'and', filters: [] }
  };
 
  public AdminDataItem: Admin;
  itemToRemove: any;
  itemToReset: number;

  constructor(private adminService: AdminService, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    const currentState = localStorage.getItem('MyAdminState');
    if (currentState != null) {
      this.gridState = JSON.parse(currentState);
    } else {
      localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
    }
    this.getAdmins();
  }

  getAdmins(): void {
    this.admingrid = this.adminService;
    this.adminService.getAdminGrid(this.gridState);
  }

  delete(Admin: Admin): void {
    this.adminService.deleteAdmin(Admin.AdminId)
      .subscribe(deletestatus => {
        this.getAdmins();
        console.log(deletestatus);
      });
  }

  onStateChange(dstate: DataStateChangeEvent): void {
    this.gridState = dstate;
    localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
    this.getAdmins();
  }

  public clearfilter(): void {
    this.gridState.skip = 0;
    this.gridState.filter = { logic: 'and', filters: [] };
    localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
    this.getAdmins();
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.AdminDataItem = dataItem;
    this.itemToReset = dataItem;
  }

  public cancelHandler() {
    this.AdminDataItem = undefined;
  }

  public saveHandler(Admin: Admin) {

    this.adminService.updateAdmin(Admin)
      .subscribe(ressupplier => {
        this.getAdmins();
      });
  }

  public removeHandler({ dataItem }) {
    this.itemToRemove = dataItem;
  }

  public confirmRemove(shouldRemove: boolean): void {
    if (shouldRemove) {
      this.adminService.deleteAdmin(this.itemToRemove.AdminId).subscribe(deletestatus => {
        this.getAdmins();
        console.log(deletestatus);
      });
    }
    this.itemToRemove = null;
  }

  public confirmReset(shouldRemove: boolean): void {
    
    if (shouldRemove) {
      this.adminService.resetAdminPassword(this.AdminDataItem).subscribe(updatepassword => {
        this.getAdmins();
      })
    }
    this.itemToReset = null;
  }

}