/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** register.component
*/

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth';

@Component({
    selector: 'app-register',
    standalone: true,
    styleUrls: ['./register.component.css'],
    templateUrl: './register.component.html',
    imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
})
export class RegisterPage {
    registerForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['Visitor']
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.errorMessage = '';

            const registerData: RegisterRequest = {
                email: this.registerForm.get('email')?.value,
                password: this.registerForm.get('password')?.value,
                role: this.registerForm.get('role')?.value || 'Visitor'
            };

            this.authService.register(registerData).subscribe({
                next: (response) => {
                    this.authService.login({ email: registerData.email, password: registerData.password }).subscribe({
                        error: (loginError) => {
                            this.errorMessage = loginError.error?.message || 'An error occurred during login';
                        },
                        next: () => {
                            this.successMessage = 'Registration successful! Redirecting to home...';
                            setTimeout(() => {
                                this.router.navigate(['/home']);
                            }, 500);
                        }
                    });
                },
                error: (error) => {
                    this.errorMessage = error.error?.message || 'An error occurred during registration';
                }
            });
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched(): void {
        Object.keys(this.registerForm.controls).forEach(key => {
            const control = this.registerForm.get(key);
            control?.markAsTouched();
        });
    }

    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
}
