import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { EventCardComponent } from '../../Components/event_card/event_card';
import { CalendarComponent } from '../../Components/Calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event',
  standalone: true,
  styleUrls: ['./event.component.css'],
  templateUrl: './event.component.html',
  imports: [HeaderComponent, FooterComponent, HeroComponent, EventCardComponent, CalendarComponent, CommonModule],
})
export class EventPage implements OnInit {
  events: Event[] = [];
  loading = true;
  error: string | null = null;

  selectedDate: Date | null = null;
  showCalendar = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.loading = true;
    this.error = null;

    this.eventsService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.error = 'Failed to load events';
        this.loading = false;
      }
    });
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  clearDateFilter(): void {
    this.selectedDate = null;
  }

  trackByEventId(index: number, event: Event): number {
    return event.id;
  }
}
