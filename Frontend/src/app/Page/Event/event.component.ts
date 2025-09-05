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
  allEvents: Event[] = [];
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
        this.allEvents = data;
        this.filterEvents();
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
    this.filterEvents();
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  clearDateFilter(): void {
    this.selectedDate = null;
    this.filterEvents();
  }

  private filterEvents(): void {
    if (!this.selectedDate) {
      this.events = [...this.allEvents];
    } else {
      this.events = this.allEvents.filter(event => {
        if (!event.date) return false;
        
        const eventDate = new Date(event.date);
        const selectedDate = new Date(this.selectedDate!);
        
        return eventDate.getFullYear() === selectedDate.getFullYear() &&
               eventDate.getMonth() === selectedDate.getMonth() &&
               eventDate.getDate() === selectedDate.getDate();
      });
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  trackByEventId(index: number, event: Event): number {
    return event.id;
  }
}
