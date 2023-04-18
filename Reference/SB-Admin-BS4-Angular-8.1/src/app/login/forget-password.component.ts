import { Component } from '@angular/core';
import { ForgetpasswordService } from '../core/service/forgetpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  username: string;
  email: string;
  errorMessage: string;
  

  constructor(private forgetPasswordService: ForgetpasswordService, private router: Router) {}

  onSubmit() {
    const data = {
      LoginName: this.username,
      Email: this.email};
      console.log(data)
      return this.forgetPasswordService.requestByEmail(data).subscribe(
        response => {
          if(response.data == 1){
            this.errorMessage = "success";
            this.router.navigate(['/login/otpcode']);
          }else{
            this.errorMessage = response.error;
          }
        }
      );
  }
}