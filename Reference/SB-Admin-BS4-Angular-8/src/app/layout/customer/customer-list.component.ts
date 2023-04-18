import { Component, OnInit } from '@angular/core';
import { Customer } from '../../core/model/customer';
import { CustomerService } from '../../core/service/customer.service';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit{

  customers: Customer[] = [];
  selectedCustomer?: Customer;

  public customergrid: Observable<GridDataResult>;
  public selectedDeptItem: number;
  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: { logic: 'and', filters: []}
  };
  public isNew: boolean;
  public customerDataItem: Customer;
  
  constructor(private   customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    const currentState = localStorage.getItem('MyCustomerState');
    if (currentState != null) {
      this.gridState = JSON.parse(currentState);
    } else {
      localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
    }
    this.getCustomers();
  }

  getCustomers(): void {
    this.customergrid = this.customerService;
    this.customerService.getCustomerGrid(this.gridState);
  }

  delete(Customer: Customer): void {
    this.customerService.deleteCustomer(Customer.CustomerId)
    .subscribe(deletestatus => {
      this.getCustomers();
      console.log(deletestatus);
    });
  }

  detail(Customer: Customer): void {
    this.router.navigate(['/customer/' + Customer.CustomerId]);
  }

  onStateChange(dstate: DataStateChangeEvent): void {
    //console.log(dstate);
    this.gridState = dstate;
    localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
    this.getCustomers();
  }

  public clearfilter(): void {
    this.gridState.skip = 0;
    this.gridState.filter = { logic: 'and', filters: []};
    localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
    this.getCustomers();
  }
  public addHandler({sender}) {
    this.isNew = true;
    this.customerDataItem = new Customer();
    
  }


  public editHandler({sender, rowIndex, dataItem}) {
    this.isNew = false;
    this.customerDataItem = dataItem;
    
  }

  public cancelHandler() {
    this.customerDataItem = undefined;
  }

  public saveHandler(customer: Customer) {
    if (this.isNew) {
      this.customerService.addCustomer(customer)
      .subscribe(ressupplier => {
        this.getCustomers();
        });
    } else {
      this.customerService.updateCustomer(customer)
      .subscribe(ressupplier => {
        this.getCustomers();
        });
    }
    this.customerDataItem = undefined;
  }
}
