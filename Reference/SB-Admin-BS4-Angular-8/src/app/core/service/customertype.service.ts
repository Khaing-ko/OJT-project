import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerType } from '../model/customer-type';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CustomertypeService {

  constructor(private apiservice: ApiService, private messageService: MessageService) { }

  getCustomerTypes(): Observable<CustomerType[]> {
    this.messageService.add('CustomerTypeService: fetched customer types');
    return this.apiservice.get("/CustomerTypes");
  }
}