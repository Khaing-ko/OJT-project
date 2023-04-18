import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdminAddComponent } from './admin-add.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AdminEditComponent } from './admin-edit.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ChangePasswordComponent } from './change-password.component';


@NgModule({
  declarations: [
    AdminListComponent,
    AdminAddComponent,
    AdminEditComponent,
    ChangePasswordComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DropDownListModule,
    ButtonModule,
    DialogModule,
    DatePickerModule,
    UploadsModule,
    NgxPermissionsModule,
    MatButtonToggleModule,
    InputsModule,
    LabelModule,
    IconsModule
  ]
})
export class AdminModule { }
