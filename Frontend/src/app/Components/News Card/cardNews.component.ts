/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** news.component
*/

import { Component, Input } from '@angular/core';
import { Image } from '../Image/image.component';

@Component({
    selector: 'app-news-card',
    standalone: true,
    templateUrl: './cardNews.component.html',
    styleUrl: './cardNews.component.css',
    imports: [Image]
})
export class cardNewsComponent {
    @Input({required: true}) title!: string;
    @Input({required: true}) imageUrl!: string;
}
