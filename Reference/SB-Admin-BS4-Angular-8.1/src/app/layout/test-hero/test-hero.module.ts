import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestHeroRoutingModule } from './test-hero-routing.module';
import { TestHeroDetailsComponent } from './test-hero-details.component';
import { TestHeroListComponent } from './test-hero-list.component';
import { FormsModule } from '@angular/forms';
import { TestHeroAddComponent } from './test-hero-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestHeroSearchComponent } from './test-hero-search.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [
    TestHeroDetailsComponent,
    TestHeroListComponent,
    TestHeroAddComponent,
    TestHeroSearchComponent
  ],
  imports: [
    CommonModule,
    TestHeroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UploadsModule,
    InputsModule,
    ButtonsModule,
  ]
})
export class TestHeroModule { }
