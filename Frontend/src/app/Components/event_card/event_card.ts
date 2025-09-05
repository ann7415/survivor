/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** event_card
*/

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event_card',
  standalone: true,
  templateUrl: './event_card.html',
  styleUrls: ['./event_card.css']
})
export class EventCardComponent {
  @Input({ required: true }) eventTitle!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) image!: string;
  @Input({ required: true }) eventId!: number;
  @Input() customClass?: string;

  constructor(private router: Router) {}

  onCardClick(): void {
    this.router.navigate(['/event', this.eventId]);
  }
}
