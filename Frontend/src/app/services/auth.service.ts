/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** auth.service
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, RegisterRequest, LoginResponse, AuthResponse } from '../models/auth';

const CLAIMS = {
  nameId:    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  email:     'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  role:      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  startupId: 'StartupId'
} as const;

const TOKEN_KEY = 'auth.token';

type DecodedClaims = Record<string, unknown> & { exp?: number };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.persistentLogin();
  }

  private persistentLogin(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    const decoded = this.decodeJwt<DecodedClaims>(token);
    if (!decoded) {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }

    if (typeof decoded.exp === 'number') {
      const expMs = decoded.exp * 1000;
      if (Date.now() >= expMs) {
        localStorage.removeItem(TOKEN_KEY);
        return;
      }
    }

    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next({
      email: decoded[CLAIMS.email] as string | undefined,
      role:  decoded[CLAIMS.role]  as string | string[] | undefined,
      userId: decoded[CLAIMS.nameId] as string | undefined,
      startupId: decoded[CLAIMS.startupId] as string | undefined
    });
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/api/auth/register', userData);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/api/Auth/login', credentials).pipe(
      tap(response => {
        localStorage.setItem(TOKEN_KEY, response.token);

        const decoded = this.decodeJwt<DecodedClaims>(response.token);
        if (!decoded) {
          localStorage.removeItem(TOKEN_KEY);
          throw new Error('Invalid JWT received');
        }

        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next({
          email: decoded[CLAIMS.email] as string | undefined,
          role:  decoded[CLAIMS.role]  as string | string[] | undefined,
          userId: decoded[CLAIMS.nameId] as string | undefined,
          startupId: decoded[CLAIMS.startupId] as string | undefined
        });
      })
    );
  }

  isConnected(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  getRole(): string | null {
    const role = this.currentUserSubject.value?.role;
    if (Array.isArray(role)) return role[0] ?? null;
    return role ?? null;
  }

  private decodeJwt<T = Record<string, unknown>>(token: string): T | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }
}
