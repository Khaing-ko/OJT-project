import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminLevel } from '../../core/model/admin-level';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../core/service/admin.service';
import { AdminLevelService } from '../../core/service/admin-level.service';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Globalfunction } from '../../core/global/globalfunction';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminEditComponent implements OnInit {
  public checked = true;

  public adminlevel: AdminLevel[];
  saveUrl: string = '';
  removeUrl: string = '';
  tempimage: string = '';
  photoToRemove: string = null;
  previewimage: {};
  tempdir: string = '-';
  public globalfunction: Globalfunction = new Globalfunction();


  adminEdit = this.fb.group({
    AdminId: [],
    AdminName: [''],
    AdminEmail: [''],
    AdminLoginName: [''],
    adminPassword: [''],
    Salt: [''],
    AdminStatus: [],
    AdminLevelId: [0],
    AdminPhoto: [''],
  });
  isActionActive: boolean = true;
  public value = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private adminLevelService: AdminLevelService,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.saveUrl = `${environment.file_api_url}` + '/Upload/TempDir';
    this.removeUrl = `${environment.file_api_url}` + '/Upload/TempRemoveDir';
    this.adminLevelService.getAdminLevel().subscribe(res => this.adminlevel = res);
    this.getAdmin();
  }


  getAdmin(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.adminService.getAdmin(id)
      .subscribe(rescustomer => {
        this.adminEdit.setValue(rescustomer);
      });
    this.adminService.getImagePath(id)
      .subscribe(resimage => {
        this.previewimage = resimage;
      });

  }

  goBack(): void {
    this.location.back();
  }

  onSave(e): void {

    e.preventDefault();

    if (this.adminEdit.value.AdminPhoto != null && this.adminEdit.value.AdminPhoto != "")
      this.adminEdit.patchValue({ AdminPhoto: this.tempdir });

    this.adminService.updateAdmin(this.adminEdit.getRawValue())
      .subscribe(rescustomer => {
        this.router.navigate(['/admin']);
      });


  }

  public onRemove(e): void {
    e.data = {
      tempdir: this.tempdir,
      tempfile: e.files[0].myUid
    };
  }

  public onSuccess(e): void {
    if (e.operation == 'upload') {
      this.tempdir = e.response.body.TempDir;
      e.files[0].myUid = e.response.body.TempFile;  //store encrypted temp file name
    }
    console.log("tempdir : " + this.tempdir);
  }

  public deleteImageHandler(e, filename) {
    this.photoToRemove = filename;
    e.preventDefault();
  }

  public onUpload(e): void {
    e.data = {
      tempdir: this.tempdir,
      enFile: this.globalfunction.encryptData(e.files[0].name)
    }
  }

  public confirmPhotoRemove(shouldRemove: boolean): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (shouldRemove) {
        this.adminService.deleteAdminPhoto(id, this.photoToRemove).subscribe(deletestatus => {
        delete this.previewimage[this.photoToRemove];
        this.photoToRemove = null;
      });
    }
    else {
      this.photoToRemove = null;
    }
  }

  toggleAction() {
    this.isActionActive = !this.isActionActive;
    if (this.isActionActive) {
      // Activate the action
      // ...
    } else {
      // Deactivate the action
      // ...
    }
  }
  
}
