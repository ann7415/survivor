import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { EventCardComponent } from '../../Components/event_card/event_card';
import { CalendarComponent } from '../../Components/Calendar/calendar.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-event',
    standalone: true,
    styleUrls: ['./event.component.css'],
    templateUrl: './event.component.html',
    imports: [HeaderComponent, FooterComponent, HeroComponent, EventCardComponent, CalendarComponent, CommonModule],
})
export class EventPage {
    selectedDate: Date | null = null;
    showCalendar = false;

    onDateSelected(date: Date): void {
        this.selectedDate = date;
        console.log('Date sélectionnée pour filtrer les événements :', date);
    }

    toggleCalendar(): void {
        this.showCalendar = !this.showCalendar;
    }

    clearDateFilter(): void {
        this.selectedDate = null;
        console.log('Filtre de date effacé');
    }
}