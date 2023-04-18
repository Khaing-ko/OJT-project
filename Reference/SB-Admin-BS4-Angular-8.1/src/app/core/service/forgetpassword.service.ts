import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private apiservice: ApiService) { }

  requestByEmail(adminSet) {
    return this.apiservice.postJson('/ForgotPassword/RequestByEmail', adminSet);
  }

  changePasswordBYOTP(adminSet) {
    return this.apiservice.postJson('/ForgotPassword/ChangePasswordByOTP', adminSet);
  }
}
