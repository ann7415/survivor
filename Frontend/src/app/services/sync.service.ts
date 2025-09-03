import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SyncResponse } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private endpoint = '/api/sync';

  constructor(private apiService: ApiService) {}

  syncStartups(): Observable<SyncResponse> {
    return this.apiService.post<SyncResponse>(`${this.endpoint}/startups`, {});
  }

  syncNews(): Observable<SyncResponse> {
    return this.apiService.post<SyncResponse>(`${this.endpoint}/news`, {});
  }

  syncEvents(): Observable<SyncResponse> {
    return this.apiService.post<SyncResponse>(`${this.endpoint}/events`, {});
  }

  syncAll(): Observable<any> {
    return this.apiService.post<any>(`${this.endpoint}/all`, {});
  }

  getSyncStatus(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/status`);
  }
}
