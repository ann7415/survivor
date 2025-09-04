import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string, filter1: string, filter2: string) {
    return this.http.get('/api/search', {
      params: { query, filter1, filter2 }
    });
  }
}