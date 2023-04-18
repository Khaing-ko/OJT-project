import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { CustomerService } from '../../core/service/customer.service';
import { Customer } from '../../core/model/customer';
import { ThemeService } from 'ng2-charts';
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
  public saveUrl = 'http://localhost:3600/api/FileService/Upload/Temp';
  public removeUrl = 'http://localhost:3600/api/FileService/Upload/TempRemove';
  public uploadComplete = false;
  public fileName: string = '';
  uploadedFileNames: string[] = [];
  customertypes: CustomerType[];
  customerformGroup: FormGroup;
  active = false;

  photoToRemove: string = null;
  previewimage: string;
  tempimage: string = '';
  uploadSaveUrl: string = '';
  uploadRemoveUrl: string = '';
  public globalfunction: Globalfunction = new Globalfunction();

  @Input() public isNew = false;

  @Input() public set model(customerobj: Customer) {

    if (customerobj !== undefined) {
      if (customerobj.CustomerId == undefined)  //New, can't use isNew flag because of delay of Input. 
      {
        this.previewimage = "";
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
          CustomerPhoto: new FormControl("")
        });
      }
    }

    this.active = customerobj !== undefined;
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Customer> = new EventEmitter();

  constructor(
    private customerservice: CustomerService,
    private customertypeServeice: CustomertypeService,
    private intl: IntlService
  ) { }

  ngOnInit(): void {
    this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/Temp';
    this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemove';
    this.customertypeServeice.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);
  }


  public onSave(e): void {
    e.preventDefault();
    var regDate = new Date(this.customerformGroup.value.RegisterDate.getTime() - (this.customerformGroup.value.RegisterDate.getTimezoneOffset() * 60000));  // localtimemilisecond - (utcoffsetminute * 60 * 1000)
    this.customerformGroup.patchValue({ RegisterDate: regDate });

    if (this.customerformGroup.value.CustomerPhoto != null && this.customerformGroup.value.CustomerPhoto != "")
      this.customerformGroup.patchValue({ CustomerPhoto: this.tempimage });

    this.save.emit(this.customerformGroup.getRawValue());
    this.active = false;
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


  public removeEventHandler(e): void {
    e.files[0].name = this.tempimage;  //replace original file name with unique temp file name
  }

  public successEventHandler(e): void {
    if (e.operation == 'upload')
      
      this.tempimage = e.response.body;

      console.log(this.tempimage);
  }

  public uploadEventHandler(e): void {
    const encData = this.globalfunction.encryptData(e.files[0].name);
    e.data = {
      enFile: encData
    };
  }

  onFileUpload(e: any) {
    if (e.files && e.files.length > 0) {
      this.fileName = e.files[0].name;
      console.log('Uploaded file name:', this.fileName);
      this.customerformGroup.get('CustomerPhoto').setValue(this.fileName);

    }
  }

  public deleteImageHandler(e) {
    this.photoToRemove = "CustomerPhoto";
    e.preventDefault();
  }

  public confirmPhotoRemove(shouldRemove: boolean): void {

    if (shouldRemove) {
        this.customerservice.deleteCustomerPhoto(this.customerformGroup.value.CustomerId).subscribe(deletestatus => {
        this.previewimage = "";
        this.photoToRemove = null;
      });
    }
    else {
      this.photoToRemove = null;
    }
  }
}