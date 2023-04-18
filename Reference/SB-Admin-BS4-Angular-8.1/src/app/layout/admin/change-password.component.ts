import { Component } from '@angular/core';
import { AdminService } from '../../core/service/admin.service';
import { error } from 'console';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private adminService: AdminService, private router: Router) {}

  showPassword = false;
 
fieldTextType: boolean;

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  changePassword() {
    const body = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    };

    return this.adminService.changepassword(body)
              .subscribe( () => {
                alert('Password changed successfully');
              },(error) => {
                alert('Error changing password');
              });
  }

}