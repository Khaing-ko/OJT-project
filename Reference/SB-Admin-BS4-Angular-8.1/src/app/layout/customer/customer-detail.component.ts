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

  public customertypes: CustomerType[];
  customerEdit = this.fb.group({
    CustomerId: [ ],
    CustomerName: [''],
    CustomerAddress: [''],
    CustomerTypeId: [0],
    RegisterDate: [new Date],
    CustomerPhoto:['']
  });

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private customertypeService : CustomertypeService,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customertypeService.getCustomerTypes().subscribe(res => this.customertypes = res);   
    this.getCustomer();
  }

  
  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
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
}