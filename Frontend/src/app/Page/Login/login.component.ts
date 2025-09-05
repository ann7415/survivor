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

    onSubmit(event: Event, email: string, password: string): void {
        event.preventDefault();
        if (email && password) {
            this.authService.login({ email, password }).subscribe({
                next: (response) => {
                    console.log('Login successful:', response);
                    window.location.href = '/home';
                },
                error: (err) => {
                    console.error('Login failed:', err);
                    alert('Login failed: ' + (err.error?.message || 'Unknown error'));
                }
            });
        } else {
            console.log('Please fill in all fields.');
        }
    }
}
