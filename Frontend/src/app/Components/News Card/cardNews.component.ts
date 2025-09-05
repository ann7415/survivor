/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** news.component
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Image } from '../Image/image.component';

@Component({
  selector: 'app-news-card',
  standalone: true,
  templateUrl: './cardNews.component.html',
  styleUrls: ['./cardNews.component.css'],
  imports: [Image, CommonModule],
  providers: [DatePipe]
})
export class CardNewsComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) category!: string;
  @Input({ required: true }) location!: string;
  @Input({ required: true }) newsId!: number;

  constructor(private router: Router) {}

  onCardClick(): void {
    this.router.navigate(['/news', this.newsId]);
  }
}
