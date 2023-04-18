import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../model/customer';
import { ApiService } from './api.service';
import { MessageService } from './message.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BehaviorSubject<GridDataResult>{
  public gridLoading: boolean;

  constructor(private apiservice: ApiService, private messageService: MessageService) { super(null)}

  getCustomers(): Observable<Customer[]> {
    this.messageService.add('CustomerService: fetched employees');
    return this.apiservice.get("/Customers");
  }

  getCustomerGrid(girdState: DataSourceRequestState) {
    this.gridLoading = true;
    return this.apiservice.fetchgridpostJson('/Customers/showlist/', girdState)
      .subscribe(x => {
      super.next(x);
      this.gridLoading = false;
    });
  }

  getCustomerReport(girdState: DataSourceRequestState, filterSet: any) {
    this.gridLoading = true;
    return this.apiservice.fetchgridpostJsonData('/Customers/report', girdState, filterSet)
      .subscribe(x => {
      super.next(x);
      this.gridLoading = false;
    });
  }

  getImagePath(id: number): Observable<string> {
    const encryptdata =  btoa(id.toString());
    return this.apiservice.get("/FileService/Download/CustomerPhoto/"+encryptdata)
  }

  deleteCustomerPhoto(id: number): Observable<any> {
    const encryptdata =  btoa(id.toString());
    this.messageService.add(`CustomerService: delete Customer Photo=${id}`);
    return this.apiservice.postJson('/FileService/Remove/CustomerPhoto/'+ encryptdata,'');
  }

  getCustomer(id: number): Observable<Customer> {
    this.messageService.add(`CustomerService: fetched Customer id=${id}`);
    return this.apiservice.get(`/Customers/${id}`);
  }

  /** POST: add a new Customer to the server */
  addCustomer(Customer: Customer): Observable<Customer> {
    this.messageService.add(`CustomerService: add Customer =${Customer.CustomerName}`);
    return this.apiservice.postJson('/Customers', Customer);
  }

  /** PUT: update the Customer on the server */
  updateCustomer(Customer: Customer): Observable<any> {
    this.messageService.add(`CustomerService: update Customer =${Customer.CustomerName}`);
    return this.apiservice.putJson('/Customers/' + Customer.CustomerId, Customer);
  }

  /** DELETE: delete the Customer from the server */
  deleteCustomer(id: number): Observable<Customer> {
    this.messageService.add(`CustomerService: delete Customer id=${id}`);
    return this.apiservice.delete('/Customers/' + id);
  }


  /* GET employees whose name contains search term */
  searchCustomeres(term: string): Observable<Customer[]> {
    if (!term.trim()) {
      // if not search term, return empty Customer array.
      return of([]);
    }
    
    this.messageService.add('CustomerService: search employees');
    return this.apiservice.postJson("/Customers/search/" + term,'');
  }
}