import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { AdminLevel } from '../model/admin-level';

@Injectable({
  providedIn: 'root'
})
export class AdminLevelService {

  constructor(private apiservice: ApiService, private messageService: MessageService) { }

  getAdminLevel(): Observable<AdminLevel[]> {
    this.messageService.add('CustomerTypeService: fetched customer types');
    return this.apiservice.get("/AdminLevels");
  }
}
