/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** event-detail.component
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { Button } from '../../Components/Button/button.component';

import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event';

@Component({
    selector: 'app-event-detail',
    standalone: true,
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css'],
    imports: [
        CommonModule,
        HeaderComponent,
        FooterComponent,
        HeroComponent,
        Button
    ],
    providers: [EventsService]
})
export class EventDetailComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    
    event: Event | null = null;
    isLoading = true;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventsService: EventsService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadEvent(+id);
        } else {
            this.errorMessage = 'Invalid event ID';
            this.isLoading = false;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadEvent(id: number): void {
        this.eventsService.getEvents().pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (events) => {
                this.event = events.find(e => e.id === id) || null;
                if (!this.event) {
                    this.errorMessage = 'Event not found';
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading event:', error);
                this.errorMessage = 'Error loading event details';
                this.isLoading = false;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/events']);
    }

    isEventPast(): boolean {
        if (!this.event) return false;
        return new Date(this.event.date) < new Date();
    }

    isEventToday(): boolean {
        if (!this.event) return false;
        const eventDate = new Date(this.event.date);
        const today = new Date();
        return eventDate.toDateString() === today.toDateString();
    }

    getEventStatus(): string {
        if (this.isEventToday()) return 'happening-today';
        if (this.isEventPast()) return 'past';
        return 'upcoming';
    }

    getEventStatusText(): string {
        if (this.isEventToday()) return 'Happening Today';
        if (this.isEventPast()) return 'Past Event';
        return 'Upcoming Event';
    }
}
