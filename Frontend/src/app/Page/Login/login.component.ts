/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** home.component
*/

import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
    imports: [HeaderComponent, FooterComponent],
})
export class LoginPage {
    constructor(private authService: AuthService) {}

    login(email: string, password: string): void {
        if (email && password) {
            this.authService.login({ email, password }).subscribe({
                next: (response) => {
                    window.location.href = '/home';
                },
                error: (err) => {
                    alert('Login failed: ' + (err.error?.message || 'Unknown error'));
                }
            });
        } else {
        }
    }
}
