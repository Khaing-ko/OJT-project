import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../core/service/admin.service';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AdminLevelService } from '../../core/service/admin-level.service';
import { AdminLevel } from '../../core/model/admin-level';
import { Globalfunction } from '../../core/global/globalfunction';


@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent {
  adminAdd: FormGroup;
  saveUrl: string = '';
  removeUrl: string = '';
  tempimage: string = '';
  photoToRemove: string = null;
  previewimage: {};
  tempdir: string = '-';
  public adminLevels: AdminLevel[];
  public globalfunction: Globalfunction = new Globalfunction();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private adminLevelService: AdminLevelService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.adminAdd = new FormGroup({
      AdminName: new FormControl('', [Validators.required]),
      AdminAddress: new FormControl('', [Validators.required]),
      AdminLevelId: new FormControl([Validators.required]),
      AdminStatus: new FormControl(true),
      AdminLoginName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      adminPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      Salt: new FormControl('',[Validators.required]),
      AdminEmail: new FormControl('', [Validators.required, Validators.email]),
      AdminPhoto: new FormControl('', [Validators.required])
    });

    this.saveUrl = `${environment.file_api_url}` + '/Upload/TempDir';
    this.removeUrl = `${environment.file_api_url}` + '/Upload/TempRemoveDir';
    this.adminLevelService.getAdminLevel().subscribe(res => this.adminLevels = res);
  }

  submitAdmin(e): void {
    e.preventDefault();
    if (this.adminAdd.value.AdminPhoto != null && this.adminAdd.value.AdminPhoto != "")
      this.adminAdd.patchValue({ AdminPhoto: this.tempdir });
    this.adminService.addAdmin(this.adminAdd.value)
      .subscribe(resadmin => {
        this.router.navigate(['/admin']);
      });
    this.tempdir = '-';
  }

  goBack(): void {
    this.location.back();
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

  public onUpload(e): void {
    e.data = {
      tempdir: this.tempdir,
      enFile: this.globalfunction.encryptData(e.files[0].name)
    }
  }
}