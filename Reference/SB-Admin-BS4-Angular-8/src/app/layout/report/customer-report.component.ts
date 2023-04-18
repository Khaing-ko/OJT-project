import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { CustomerService } from '../../core/service/customer.service';
import { CustomertypeService } from '../../core/service/customertype.service';
import { State } from "@progress/kendo-data-query";
import { CustomerType } from '../../core/model/customer-type';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent {

  public reportgrid: Observable<GridDataResult>;
  public showSearchStr: string = 'Show Filter';
  public isSearchOpened: boolean = false;
  public customertypes: CustomerType[];
  public gridState: State = {
    sort: [{ 'field': 'ID', 'dir': 'asc' }],
    skip: 0,
    take: 10,
    filter: { logic: 'and', filters: [] }
  };

  reportForm = this.formbuilder.group({
    CustomerName: [''],
    CustomerTypeId: [''],
    FromDate: [''],
    ToDate: ['']    
  });

  constructor(private formbuilder: FormBuilder, 
      @Inject(LOCALE_ID) private locale: string,
      private customertypeService: CustomertypeService, 
      private customerService: CustomerService) {

  }

  ngOnInit(): void {
    this.customertypeService.getCustomerTypes().subscribe(res => this.customertypes = res);
    this.reportgrid = this.customerService;

    const currentState = JSON.parse(localStorage.getItem('MyCustomerReportState'));
    if (currentState != null) {
      if(currentState.FromDate !=null && currentState.FromDate!="")
      {
        currentState.FromDate=new Date(currentState.FromDate);
      }
      if(currentState.ToDate !=null && currentState.ToDate!="")
      {
        currentState.ToDate=new Date(currentState.ToDate);
      }
      
      this.reportForm.reset(currentState);
    } 
    else {
      localStorage.setItem('MyCustomerReportState', JSON.stringify(this.reportForm.value));
    }
    this.Search();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.Search();
  }

  Search(): void {
    localStorage.setItem('MyCustomerReportState', JSON.stringify(this.reportForm.value));
    
    if(this.reportForm.value.FromDate != "" && this.reportForm.value.FromDate != null)
      this.reportForm.value.FromDate = formatDate(this.reportForm.value.FromDate, 'yyyy-MM-dd', this.locale);

    if(this.reportForm.value.ToDate != "" && this.reportForm.value.ToDate != null)
      this.reportForm.value.ToDate = formatDate(this.reportForm.value.ToDate, 'yyyy-MM-dd', this.locale);

    this.customerService.getCustomerReport(this.gridState, this.reportForm.value);
  }

  Clear() {
    this.reportForm.reset();        
    localStorage.removeItem('MyCustomerReportState');
    this.customerService.getCustomerReport(this.gridState, this.reportForm.value);
  }

  showSearch(paraIsOpened) {
    if (paraIsOpened == false) {
      this.isSearchOpened = true;
      this.showSearchStr = 'Hide Filter';
    }
    else {
      this.isSearchOpened = false;
      this.showSearchStr = 'Show Filter';
    }
  }
}