import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierType } from '../model/supplier-type';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SuppliertypeService {

  constructor(private apiservice: ApiService, private messageService: MessageService) { }

  getSupplierTypes(): Observable<SupplierType[]> {
    this.messageService.add('SupplierTypeService: fetched employees');
    return this.apiservice.get("/SupplierTypes");
  }
}