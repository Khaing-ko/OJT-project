import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, of } from 'rxjs';
import { SupplierType } from '../../core/model/supplier-type';
import { Supplier } from '../../core/model/supplier';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { SupplierService } from '../../core/service/supplier.service';
import { SuppliertypeService } from '../../core/service/suppliertype.service';
import { Router } from '@angular/router';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-supplier-inline',
  templateUrl: './supplier-inline.component.html',
  styleUrls: ['./supplier-inline.component.scss']
})
export class SupplierInlineComponent implements OnInit {

  public saveUrl = 'https://localhost:3000/upload';
  public removeUrl = 'https://localhost:3000/remove';

  public suppliergrid: Observable<GridDataResult>;
  public selectedDeptItem: number;
  public itemToRemove: any;
  public supplierDataItem: Supplier;
  public isNew: boolean;
  public supplierformGroup: FormGroup;
  public editedRowIndex: number;
  public suppliertypes: SupplierType[];

  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: { logic: 'and', filters: [] }
  };

  constructor(
    private supplierService: SupplierService,
    private suppliertypeService: SuppliertypeService,
    private router: Router,
    private intl: IntlService
  ) { }

  ngOnInit() {

    const currentState = localStorage.getItem('MySupplierInlineState');
    if (currentState != null) {
      this.gridState = JSON.parse(currentState);
    } else {
      localStorage.setItem('MySupplierInlineState', JSON.stringify(this.gridState));
    }
    this.suppliertypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);
    this.getSuppliers();
  }



  getSuppliers(): void {

    this.suppliergrid = this.supplierService;
    this.supplierService.getSupplierGrid(this.gridState);
    // this.supplierService.getSupplierGrid(this.gridState).subscribe(ressuppliers => {
    //   this.suppliergrid = of(ressuppliers);
    // });
  }
  // this.supplierService.getSupplierGrid(this.gridState)
  // .subscribe(ressuppliers => this.suppliergrid = ressuppliers);
  // this.supplierService.getSupplierGrid(this.gridState).subscribe(ressuppliers => this.suppliergrid = ressuppliers);


  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.supplierformGroup = undefined;
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.supplierformGroup = new FormGroup({
      SupplierName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      RegisterDate: new FormControl(new Date()),
      SupplierAddress: new FormControl(''),
      SupplierTypeId: new FormControl(0)
    });
    sender.addRow(this.supplierformGroup);

  }


  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.supplierformGroup = new FormGroup({
      SupplierId: new FormControl(dataItem.SupplierId),
      SupplierName: new FormControl(dataItem.SupplierName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(dataItem.RegisterDate, 'yyyy-MM-dd'))),
      SupplierAddress: new FormControl(dataItem.SupplierAddress),
      SupplierTypeId: new FormControl(dataItem.SupplierTypeId)
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.supplierformGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    var regDate = new Date(this.supplierformGroup.value.RegisterDate.getTime() - (this.supplierformGroup.value.RegisterDate.getTimezoneOffset() * 60000));  // localtimemilisecond - (utcoffsetminute * 60 * 1000)
    this.supplierformGroup.patchValue({ RegisterDate: regDate });

    if (isNew) {
      this.supplierService.addSupplier(this.supplierformGroup.value)
        .subscribe(ressupplier => {
          this.getSuppliers();
        });
    } else {
      this.supplierService.updateSupplier(this.supplierformGroup.value)
        .subscribe(ressupplier => {
          this.getSuppliers();
        });
    }
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.itemToRemove = dataItem;
  }

  public confirmRemove(shouldRemove: boolean): void {
    if (shouldRemove) {
      this.supplierService.deleteSupplier(this.itemToRemove.SupplierId).subscribe(deletestatus => {
        this.getSuppliers();
        console.log(deletestatus);
      });
    }
    this.itemToRemove = null;
  }

  detail(Supplier: Supplier): void {
    this.router.navigate(['/supplier/' + Supplier.SupplierId]);
  }

  onStateChange(dstate: DataStateChangeEvent): void {
    //console.log(dstate);
    this.gridState = dstate;
    localStorage.setItem('MySupplierInlineState', JSON.stringify(this.gridState));
    this.getSuppliers();
  }
}