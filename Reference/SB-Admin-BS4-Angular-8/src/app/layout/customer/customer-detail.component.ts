import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../core/service/customer.service';
import { Customer } from '../../core/model/customer';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { CustomertypeService } from '../../core/service/customertype.service';
import { CustomerType } from '../../core/model/customer-type';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
// export class CustomerDetailComponent {

//   customer: Customer | undefined;
//   constructor(
//     private route: ActivatedRoute,
//     private customerService: CustomerService,
//     private location: Location
//   ) {}

//   ngOnInit(): void {
//     this.getCustomer();
//   }
  
//   getCustomer(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.customerService.getCustomer(id)
//       .subscribe(customer => this.customer = customer);
//   }

//   goBack(): void {
//     this.location.back();
//   }

//   save(): void {
//     if (this.customer) {
//       this.customerService.updateCustomer(this.customer)
//         .subscribe(() => this.goBack());
//     }
//   }

// }

export class CustomerDetailComponent implements OnInit {

  
  customerEdit = this.fb.group({
    CustomerId: [ ],
    CustomerName: [''],
    CustomerAddress: [''],
    CustomerTypeId: [0],
    RegisterDate: [new Date],
    CustomerPhoto: [''],
  });

  public customertypes: CustomerType[];
  public saveUrl = 'http://localhost:3600/api/FileService/Upload/Temp';
  public removeUrl = 'http://localhost:3600/api/FileService/Upload/TempRemove';
  public uploadComplete = false;
  public fileName: string = '';

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private customertypeService : CustomertypeService,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customertypeService.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);    
    this.getCustomer();
  }

  
  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id)
      .subscribe(rescustomer => {
        this.customerEdit.setValue(rescustomer);
      });
  }

  goBack(): void {
    this.location.back();
  }

  saveCustomer(): void {
    this.customerService.updateCustomer(this.customerEdit.getRawValue())
    .subscribe(rescustomer => {
      this.router.navigate(['/customer']);
      });
  }

  public restrictions = {
    allowedExtensions: ['.jpg', '.png', '.gif'],
    maxFileSize: 1000000
  };


  public onRemove(e): void {
    console.log('File removed:', e);
  }

  public onSuccess(e): void {
    console.log('File uploaded:', e);
    this.uploadComplete = true;
    this.fileName = e.files[0].name;
  }

  public onUpload(e): void {
    console.log('File upload initiated:', e);
  }

  onFileUpload(e: any) {
    if (e.files && e.files.length > 0) {
      this.fileName = e.files[0].name;
      console.log('Uploaded file name:', this.fileName);
      this.customerEdit.get('CustomerPhoto').setValue(this.fileName);

    }
  }
}