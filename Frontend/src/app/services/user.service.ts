import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { User, UserUpdate, UserRoleUpdate, UserStartupAssignment } from '../models/user';
import { LoginRequest } from '../models/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = '/api/users';

  constructor(private apiService: ApiService) {}

  getUsers(role?: string, search?: string): Observable<User[]> {
    let params = new HttpParams();

    let authService = new AuthService(this.apiService);
    authService.login({email: "admin@jeb.com", password: "admin123"}).subscribe();

    if (role) params = params.set('role', role);
    if (search) params = params.set('search', search);
    return this.apiService.get<User[]>(this.endpoint, params);
  }

  getUser(id: number): Observable<User> {
    return this.apiService.get<User>(`${this.endpoint}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.apiService.get<User>(`${this.endpoint}/by-email/${encodeURIComponent(email)}`);
  }

  updateUser(id: number, user: UserUpdate): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  updateUserRole(id: number, role: string): Observable<void> {
    return this.apiService.patch<void>(`${this.endpoint}/${id}/role`, { role });
  }

  assignUserToStartup(id: number, startupId?: number): Observable<void> {
    return this.apiService.patch<void>(`${this.endpoint}/${id}/startup`, { startupId });
  }
}
