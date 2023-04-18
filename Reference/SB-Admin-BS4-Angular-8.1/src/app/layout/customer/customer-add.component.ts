import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../core/service/customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {

  customerAdd: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.customerAdd = new FormGroup({
      CustomerName: new FormControl(''),
      CustomerAddress: new FormControl(''),
      CustomerTypeId: new FormControl()
    });
  }


  submitCustomer(): void {
    this.customerService.addCustomer(this.customerAdd.value)
      .subscribe(rescustomer => {
        this.router.navigate(['/customer']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}