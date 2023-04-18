import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ForgetPasswordComponent } from './forget-password.component';
import { OptCodeComponent } from './opt-code.component';


@NgModule({
    imports: [CommonModule, TranslateModule, LoginRoutingModule,ReactiveFormsModule,FormsModule],
    declarations: [LoginComponent, ForgetPasswordComponent, OptCodeComponent]
})
export class LoginModule {}
