import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { ForgetPasswordComponent } from './forget-password.component';
import { OptCodeComponent } from './opt-code.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'otpcode',
        component: OptCodeComponent
    },
    {
        path: 'forgetpassword',
        component: ForgetPasswordComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
