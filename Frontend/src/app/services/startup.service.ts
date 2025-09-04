import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StartupDto {
  id: number;
  name: string;
  description: string;
  sector: string;
  location: string;
  website: string;
  contactEmail: string;
  status: string;
  createdDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private readonly apiUrl = `${environment.apiUrl}/startups`;

  constructor(private http: HttpClient) {}

  getStartups(search?: string): Observable<StartupDto[]> {
    const url = search ? `${this.apiUrl}?search=${encodeURIComponent(search)}` : this.apiUrl;
    return this.http.get<StartupDto[]>(url);
  }

  getStartupById(id: number): Observable<StartupDto> {
    return this.http.get<StartupDto>(`${this.apiUrl}/${id}`);
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/locations`);
  }

  getSectors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/sectors`);
  }

  createStartup(startup: Omit<StartupDto, 'id' | 'createdDate'>): Observable<StartupDto> {
    return this.http.post<StartupDto>(this.apiUrl, startup);
  }

  updateStartup(id: number, startup: Omit<StartupDto, 'id' | 'createdDate'>): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, startup);
  }

  deleteStartup(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
