import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../core/service/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent {

  supplierAdd: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.supplierAdd = new FormGroup({
      SupplierName: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(20) ]),
      SupplierAddress: new FormControl(''),
      SupplierTypeId: new FormControl()
    });
  }


  submitSupplier(): void {
    this.supplierService.addSupplier(this.supplierAdd.value)
      .subscribe(rescustomer => {
        this.router.navigate(['/supplier']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}