/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** roleGuard.service
*/

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {
    constructor(private authService: AuthService) {}

    canActivate(expectedRole: string | [string]): boolean {
        const role = this.authService.getRole();
        if (role && (role === expectedRole || (Array.isArray(expectedRole) && expectedRole.includes(role))))
            return true;
        window.location.href = '/home';
        return false;
    }
}
