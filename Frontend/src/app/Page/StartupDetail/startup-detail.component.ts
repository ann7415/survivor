/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** startup-detail.component
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { Button } from '../../Components/Button/button.component';

import { StartupsService } from '../../services/startups.service';
import { Startup } from '../../models/startup';

@Component({
    selector: 'app-startup-detail',
    standalone: true,
    templateUrl: './startup-detail.component.html',
    styleUrls: ['./startup-detail.component.css'],
    imports: [
        CommonModule,
        HeaderComponent,
        FooterComponent,
        HeroComponent,
        Button
    ],
    providers: [StartupsService]
})
export class StartupDetailComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    
    startup: Startup | null = null;
    isLoading = true;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private startupService: StartupsService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadStartup(+id);
        } else {
            this.errorMessage = 'Invalid startup ID';
            this.isLoading = false;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadStartup(id: number): void {
        this.startupService.getStartups().pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (startups) => {
                this.startup = startups.find(s => s.id === id) || null;
                if (!this.startup) {
                    this.errorMessage = 'Startup not found';
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading startup:', error);
                this.errorMessage = 'Error loading startup details';
                this.isLoading = false;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/projects']);
    }

    visitWebsite(): void {
        if (this.startup?.website) {
            window.open(this.startup.website, '_blank');
        }
    }

    sendEmail(): void {
        if (this.startup?.contactEmail) {
            window.location.href = `mailto:${this.startup.contactEmail}`;
        }
    }
}
