import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { CustomerService } from '../../core/service/customer.service';
import { Customer } from '../../core/model/customer';
import { CustomerType } from '../../core/model/customer-type';
import { CustomertypeService } from '../../core/service/customertype.service';
import { Globalfunction } from '../../core/global/globalfunction';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent {

  uploadedFileNames: string[] = [];
  public customertypes: CustomerType[];
  customerformGroup: FormGroup;
  active = false;
  @Input() public isNew = false;
  public globalfunction: Globalfunction = new Globalfunction();

  saveUrl: string = '';
  removeUrl: string = '';
  tempimage: string = '';
  photoToRemove: string = null;
  previewimage: {};
  tempdir: string = '-';

  @Input() public set model(customerobj: Customer) {

    if (customerobj !== undefined) {
      if (customerobj.CustomerId == undefined)  //New, can't use isNew flag because of delay of Input. 
      {
        this.previewimage = {};
        this.customerformGroup = new FormGroup({
          CustomerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
          RegisterDate: new FormControl(new Date()),
          CustomerAddress: new FormControl(''),
          CustomerTypeId: new FormControl(0),
          CustomerPhoto: new FormControl(''),
        });
      }
      else {  //Edit
        this.customerservice.getImagePath(customerobj.CustomerId)
          .subscribe(resimage => {
            this.previewimage = resimage;
          });
        this.customerformGroup = new FormGroup({
          CustomerId: new FormControl(customerobj.CustomerId),
          CustomerName: new FormControl(customerobj.CustomerName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
          RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(customerobj.RegisterDate, 'yyyy-MM-dd'))),
          CustomerAddress: new FormControl(customerobj.CustomerAddress),
          CustomerTypeId: new FormControl(customerobj.CustomerTypeId),
          CustomerPhoto: new FormControl('')
        });
      }
    }

    this.active = customerobj !== undefined;
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Customer> = new EventEmitter();

  constructor(
    private customerservice: CustomerService,
    private customertypeService: CustomertypeService,
    private intl: IntlService
  ) { }

  ngOnInit(): void {
    this.saveUrl = `${environment.file_api_url}` + '/Upload/TempDir';
    this.removeUrl = `${environment.file_api_url}` + '/Upload/TempRemoveDir';
    this.customertypeService.getCustomerTypes().subscribe(res => this.customertypes = res);
  }


  public onSave(e): void {
    e.preventDefault();
    var regDate = new Date(this.customerformGroup.value.RegisterDate.getTime() - (this.customerformGroup.value.RegisterDate.getTimezoneOffset() * 60000));  // localtimemilisecond - (utcoffsetminute * 60 * 1000)
    this.customerformGroup.patchValue({ RegisterDate: regDate });

    if (this.customerformGroup.value.CustomerPhoto != null && this.customerformGroup.value.CustomerPhoto != "")
      this.customerformGroup.patchValue({ CustomerPhoto: this.tempdir });

    this.save.emit(this.customerformGroup.getRawValue());
    this.active = false;
    this.tempdir = '-';
  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }

  private closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }

  public restrictions = {
    allowedExtensions: ['.jpg', '.png', '.gif'],
    maxFileSize: 1000000
  };


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

  public deleteImageHandler(e,filename) {
    this.photoToRemove = filename;
    e.preventDefault();
  }

  public confirmPhotoRemove(shouldRemove: boolean): void {

    if (shouldRemove) {
        this.customerservice.deleteCustomerPhoto(this.customerformGroup.value.CustomerId, this.photoToRemove).subscribe(deletestatus => {
        delete this.previewimage[this.photoToRemove];
        this.photoToRemove = null;
      });
    }
    else {
      this.photoToRemove = null;
    }
  }
}