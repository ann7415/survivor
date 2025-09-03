import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { News, NewsCreate, NewsUpdate } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private endpoint = '/api/news';

  constructor(private apiService: ApiService) {}

  getNews(category?: string, search?: string): Observable<News[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (search) params = params.set('search', search);
    return this.apiService.get<News[]>(this.endpoint, params);
  }

  getNewsById(id: number): Observable<News> {
    return this.apiService.get<News>(`${this.endpoint}/${id}`);
  }

  createNews(news: NewsCreate): Observable<News> {
    return this.apiService.post<News>(this.endpoint, news);
  }

  updateNews(id: number, news: NewsUpdate): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, news);
  }

  deleteNews(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  togglePublishStatus(id: number): Observable<void> {
    return this.apiService.patch<void>(`${this.endpoint}/${id}/publish`, {});
  }
}
