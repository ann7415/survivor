/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** calendar.component
*/

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event';

interface CalendarDay {
  day: number | null;
  classes: string;
  isClickable: boolean;
  hasEvents: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>();
  @Input() events: Event[] = [];

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  selectedDate: Date | null = null;

  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  get calendarDays(): (number | null)[] {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < startDate; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  selectDate(day: number | null): void {
    if (day) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      this.dateSelected.emit(this.selectedDate);
    }
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && 
           this.currentMonth === today.getMonth() && 
           this.currentYear === today.getFullYear();
  }

  isSelected(day: number | null): boolean {
    if (!day || !this.selectedDate) return false;
    return day === this.selectedDate.getDate() && 
           this.currentMonth === this.selectedDate.getMonth() && 
           this.currentYear === this.selectedDate.getFullYear();
  }

  getCalendarDaysWithClasses(): CalendarDay[] {
    return this.calendarDays.map(day => ({
      day: day,
      classes: this.getCalendarDayClasses(day),
      isClickable: !!day,
      hasEvents: this.hasEventsOnDay(day)
    }));
  }

  private getCalendarDayClasses(day: number | null): string {
    let classes = 'calendar-day';
    
    if (!day) {
      classes += ' empty-day';
    }
    
    if (this.isToday(day)) {
      classes += ' today';
    }
    
    if (this.isSelected(day)) {
      classes += ' selected';
    }
    
    if (day) {
      classes += ' clickable';
    }
    
    if (this.hasEventsOnDay(day)) {
      classes += ' has-events';
    }
    
    return classes;
  }

  private hasEventsOnDay(day: number | null): boolean {
    if (!day || !this.events) return false;
    
    const dayDate = new Date(this.currentYear, this.currentMonth, day);
    
    return this.events.some(event => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === dayDate.getFullYear() &&
             eventDate.getMonth() === dayDate.getMonth() &&
             eventDate.getDate() === dayDate.getDate();
    });
  }
}
