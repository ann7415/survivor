/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** hero.component
*/

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css'],
    imports: [CommonModule],
})

export class HeroComponent {
    @Input() customClass?: string;
    @Input({ required: true }) text!: string;
}

