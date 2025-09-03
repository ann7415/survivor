import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Event, EventCreate, EventUpdate } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private endpoint = '/api/events';

  constructor(private apiService: ApiService) {}

  getEvents(type?: string, startDate?: Date, endDate?: Date): Observable<Event[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (startDate) params = params.set('startDate', startDate.toISOString());
    if (endDate) params = params.set('endDate', endDate.toISOString());
    return this.apiService.get<Event[]>(this.endpoint, params);
  }

  getEvent(id: number): Observable<Event> {
    return this.apiService.get<Event>(`${this.endpoint}/${id}`);
  }

  getUpcomingEvents(count: number = 10): Observable<Event[]> {
    const params = new HttpParams().set('count', count.toString());
    return this.apiService.get<Event[]>(`${this.endpoint}/upcoming`, params);
  }

  createEvent(event: EventCreate): Observable<Event> {
    return this.apiService.post<Event>(this.endpoint, event);
  }

  updateEvent(id: number, event: EventUpdate): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
