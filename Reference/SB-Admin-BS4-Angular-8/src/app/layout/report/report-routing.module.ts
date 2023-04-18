import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReportComponent } from './customer-report.component';

const routes: Routes = [
  { path: '', component: CustomerReportComponent },
  { path: 'customer', component: CustomerReportComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
