import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from '../../../../node_modules/rxjs';
import { GridDataResult } from '../../../../node_modules/@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Admin } from '../model/admin';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BehaviorSubject<GridDataResult> {

  public loading: boolean;
  
  constructor(private apiservice: ApiService, private messageService: MessageService) {
    super(null);
  }

  getAdminList(girdState: any) {
    this.loading = true;
    this.apiservice.fetchgridpostJson('/Admin/GetAdminList/', girdState)
      .subscribe(x => {
        super.next(x);
        this.loading = false;
      });
  }

  getAdminGrid(girdState: DataSourceRequestState) {
    return this.apiservice.fetchgridpostJson('/Admins/showlist/', girdState)
      .subscribe(x => {
      super.next(x);
    });
  }

  getAdminComboData() {
    return this.apiservice.get('/Admin/GetAdminComboData');
  }
  getBranchComboData(){
    return this.apiservice.get('/Admin/GetBranchComboData');
  }
  getBranchData(data){
    return this.apiservice.postJson('/Admin/GetBranchData/',data);
  }

  addAdmin(adminSet) {
    return this.apiservice.postJson('/Admins/AddAdminSetup', adminSet);
  }

  updateAdmin(adminSet) {
    return this.apiservice.putJson(`/Admins/UpdateAdminSetup/${adminSet.AdminId}`, adminSet);
  }

  deleteAdmin(adminID) {
    return this.apiservice.delete('/Admins/DeleteAdminSetup/' + adminID);
  }

  getImagePath(id: number): Observable<string> {
    var encryptdata = btoa(id.toString());  //convert to base64
    return this.apiservice.get('/FileService/DownloadDir/AdminPhoto/' + encryptdata);
  }

  getProfileImage(): Observable<string> {
    return this.apiservice.get('/FileService/ProfilePhoto');
  }

  deleteAdminPhoto(id: number, filename: string): Observable<string> {
    const encryptdata = btoa(id.toString());  //convert to base64
    return this.apiservice.postJson('/FileService/RemoveDir/AdminPhoto/' + encryptdata, filename);  //single file
  }

  unBlock(adminID: number) {
    return this.apiservice.get('/Admin/unBlock/' + adminID.toString());
  }

  InactivateAdmin(adminID: number) {
    return this.apiservice.get('/Admin/InactivateAdmin/' + adminID.toString());
  }
  ActivateAdmin(adminID: number) {
    return this.apiservice.get('/Admin/ActivateAdmin/' + adminID.toString());
  }

  getAdmin(id: number): Observable<Admin> {
    this.messageService.add(`CustomerService: fetched Customer id=${id}`);
    return this.apiservice.get(`/Admins/${id}`);
  }

  resetAdminPassword(adminSet): Observable<any> {
    return this.apiservice.putJson(`/Admins/ResetAdminPassword/${adminSet.AdminId}`,'');
  }

  changepassword(adminSet): Observable<any>{
    return this.apiservice.postJson('/Admins/changepassword',adminSet);
  }
  
}