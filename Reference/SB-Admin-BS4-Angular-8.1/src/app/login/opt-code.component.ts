import { Component, OnInit } from '@angular/core';
import { OTP } from '../core/model/otp';
import { Router } from '@angular/router';
import { ForgetpasswordService } from '../core/service/forgetpassword.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-opt-code',
  templateUrl: './opt-code.component.html',
  styleUrls: ['./opt-code.component.scss']
})
export class OptCodeComponent implements OnInit {

  otpForm: FormGroup;
  otpData: OTP = {
    loginName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otpPasscode: '',
    otpPrefix: ''
  }
  errorMessage: string;

  constructor(private forgetPasswordService: ForgetpasswordService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      loginName: ['', Validators.required, Validators.minLength(5), Validators.maxLength(20)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(5), Validators.maxLength(20)],
      confirmPassword: ['', Validators.required],
      otpPasscode: ['', Validators.required],
      otpPrefix: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  onSubmit() {
    const data = this.otpData;

    // Send data to API endpoint
    this.forgetPasswordService.changePasswordBYOTP(data)
      .subscribe(
        response => {
          if (response.data == 1) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.error;
          }
        });
  }
}
