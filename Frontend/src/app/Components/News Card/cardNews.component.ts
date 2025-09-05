/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** news.component
*/

import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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

}
