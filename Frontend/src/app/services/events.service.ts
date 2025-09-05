import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private endpoint = '/api/events';

  constructor(private apiService: ApiService) {}

  getEvents(): Observable<Event[]> {
    return this.apiService.get<Event[]>(this.endpoint);
  }

  getEvent(id: number): Observable<Event> {
    return this.apiService.get<Event>(`${this.endpoint}/${id}`);
  }
}
