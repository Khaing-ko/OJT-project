import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Supplier } from '../model/supplier';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BehaviorSubject<GridDataResult> {
  public gridLoading: boolean;

  constructor(private apiservice: ApiService, private messageService: MessageService) { super(null) }

  getSuppliers(): Observable<Supplier[]> {
    this.messageService.add('SupplierService: fetched employees');
    return this.apiservice.get("/Suppliers");
  }

  // getSupplierGrid(girdState: DataSourceRequestState): Observable<GridDataResult> {
  //   return this.apiservice.fetchgridpostJson('/Suppliers/showlist/', girdState);
  // }
  getSupplierGrid(girdState: DataSourceRequestState) {
    this.gridLoading = true;
    return this.apiservice.fetchgridpostJson('/Suppliers/showlist/', girdState)
      .subscribe(x => {
      super.next(x);
      this.gridLoading = false;
    });
  }

  getSupplier(id: number): Observable<Supplier> {
    this.messageService.add(`SupplierService: fetched Supplier id=${id}`);
    return this.apiservice.get(`/Suppliers/${id}`);
  }

  /** POST: add a new Supplier to the server */
  addSupplier(Supplier: Supplier): Observable<Supplier> {
    this.messageService.add(`SupplierService: add Supplier =${Supplier.SupplierName}`);
    return this.apiservice.postJson('/Suppliers', Supplier);
  }

  /** PUT: update the Supplier on the server */
  updateSupplier(Supplier: Supplier): Observable<any> {
    this.messageService.add(`SupplierService: update Supplier =${Supplier.SupplierName}`);
    return this.apiservice.putJson('/Suppliers/' + Supplier.SupplierId, Supplier);
  }

  /** DELETE: delete the Supplier from the server */
  deleteSupplier(id: number): Observable<Supplier> {
    this.messageService.add(`SupplierService: delete Supplier id=${id}`);
    return this.apiservice.delete('/Suppliers/' + id);
  }


  /* GET employees whose name contains search term */
  searchSupplieres(term: string): Observable<Supplier[]> {
    if (!term.trim()) {
      // if not search term, return empty Supplier array.
      return of([]);
    }
    this.messageService.add('SupplierService: search employees');
    return this.apiservice.postJson("/Suppliers/search/" + term, '');
  }
}