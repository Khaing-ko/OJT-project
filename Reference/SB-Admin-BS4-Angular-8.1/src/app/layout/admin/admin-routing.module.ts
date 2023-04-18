import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list.component';
import { AdminAddComponent } from './admin-add.component';
import { AdminEditComponent } from './admin-edit.component';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
  { path: '', component: AdminListComponent },
  { path: 'changepassword', component: ChangePasswordComponent} ,
  { path: 'admin-details/:id', component: AdminEditComponent },
  { path: 'add', component: AdminAddComponent},
  
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
