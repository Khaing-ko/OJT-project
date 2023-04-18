import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerAddComponent } from './customer-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerSearchComponent } from './customer-search.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CustomerDialogComponent } from './customer-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { NgxPermissionsModule } from 'ngx-permissions';





@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerAddComponent,
    CustomerSearchComponent,
    CustomerDialogComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DropDownListModule,
    ButtonModule,
    DialogModule,
    DatePickerModule,
    UploadsModule,
    NgxPermissionsModule
  ]
})
export class CustomerModule { }
