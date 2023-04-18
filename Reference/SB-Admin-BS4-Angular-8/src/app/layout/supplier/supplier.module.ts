import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierAddComponent } from './supplier-add.component';
import { SupplierSearchComponent } from './supplier-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { SupplierInlineComponent } from './supplier-inline.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import {  DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';



@NgModule({
  declarations: [
    SupplierListComponent,
    SupplierDetailComponent,
    SupplierAddComponent,
    SupplierSearchComponent,
    SupplierInlineComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DropDownListModule,
    ButtonModule,
    DialogModule,
    DatePickerModule,
    UploadsModule,
    InputsModule,
    ButtonsModule,
   
  ]
})
export class SupplierModule { }
