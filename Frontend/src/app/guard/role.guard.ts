/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** roleGuard.service
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];
        const role = this.authService.getRole();
        if (role && (role === expectedRole || (Array.isArray(expectedRole) && expectedRole.includes(role)))) {
            return true;
        }
        window.location.href = '/unknown';
        return false;
    }
}
