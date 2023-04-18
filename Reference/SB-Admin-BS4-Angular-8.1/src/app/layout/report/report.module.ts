import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { CustomerReportComponent } from './customer-report.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';


@NgModule({
  declarations: [
    CustomerReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    GridModule,
    ReactiveFormsModule,
    DropDownsModule,
    DatePickerModule,
  ]
})
export class ReportModule { }
