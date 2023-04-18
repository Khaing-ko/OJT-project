import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Supplier } from '../../core/model/supplier';
import { SupplierService } from '../../core/service/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SuppliertypeService } from '../../core/service/suppliertype.service';
import { SupplierType } from '../../core/model/supplier-type';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  suppliertypes: SupplierType[];
  selectedSuppliertype: number;

  supplierEdit = this.fb.group({
    SupplierId: [0],
    SupplierName: [''],
    SupplierAddress: [''],
    SupplierTypeId: [0],
    RegisterDate: [new Date],
    SupplierPhoto:['']
  });

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private suppliertypeService: SuppliertypeService,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit(): void {
// this.supplierService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);    
    this.getSupplier();
  }

  
  getSupplier(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.supplierService.getSupplier(id)
      .subscribe(ressupplier => {
        this.supplierEdit.setValue(ressupplier);
      });
  }

  goBack(): void {
    this.location.back();
  }

  saveSupplier(): void {
    this.supplierService.updateSupplier(this.supplierEdit.getRawValue())
    .subscribe(ressupplier => {
      this.router.navigate(['/supplier']);
      });
  }
}