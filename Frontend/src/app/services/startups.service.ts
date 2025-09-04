import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Startup, StartupCreate, StartupUpdate } from '../models/startup';

@Injectable({
  providedIn: 'root'
})
export class StartupsService {
  private endpoint = '/api/startups';

  constructor(private apiService: ApiService) {}

  getStartups(search?: string): Observable<Startup[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.apiService.get<Startup[]>(this.endpoint, params);
  }

  getStartup(id: number): Observable<Startup> {
    return this.apiService.get<Startup>(`${this.endpoint}/${id}`);
  }

  createStartup(startup: StartupCreate): Observable<Startup> {
    return this.apiService.post<Startup>(this.endpoint, startup);
  }

  updateStartup(id: number, startup: StartupUpdate): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, startup);
  }

  deleteStartup(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  getLocations(): Observable<string[]> {
    return this.apiService.get<string[]>(`${this.endpoint}/locations`);
  }

  getSectors(): Observable<string[]> {
    return this.apiService.get<string[]>(`${this.endpoint}/sectors`);
  }
}
