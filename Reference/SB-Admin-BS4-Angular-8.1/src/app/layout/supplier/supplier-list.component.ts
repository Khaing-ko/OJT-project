import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Supplier } from '../../core/model/supplier';
import { SupplierService } from '../../core/service/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {

  suppliers: Supplier[] = [];
  selectedSupplier?: Supplier;

  public suppliergrid: Observable< GridDataResult>;
  public selectedDeptItem: number;
  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: { logic: 'and', filters: []}
  };
  
  constructor(private supplierService: SupplierService, private router: Router) { }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(): void {

    this.suppliergrid = this.supplierService;
    this.supplierService.getSupplierGrid(this.gridState);
    // this.supplierService.getSupplierGrid(this.gridState)
    // .subscribe(ressuppliers => this.suppliergrid = ressuppliers);
  }

  delete(supplier: Supplier): void {
    this.supplierService.deleteSupplier(supplier.SupplierId)
    .subscribe(deletestatus => {
      this.getSuppliers();
      console.log(deletestatus);
    });
  }

  detail(supplier: Supplier): void {
    this.router.navigate(['/supplier/' + supplier.SupplierId]);
  }

  onStateChange(dstate: DataStateChangeEvent): void {
    //console.log(dstate);
    this.gridState = dstate;
    localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
    this.getSuppliers();
  }

  public clearfilter(): void {
    this.gridState.skip = 0;
    this.gridState.filter = { logic: 'and', filters: []};
    localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
    this.getSuppliers();
  }
}
