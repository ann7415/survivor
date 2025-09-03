/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** image.component
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image',
    standalone: true,
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css'],
    imports: [CommonModule],
})

export class Image {
    @Input() alt?: string;
    @Input() customClass?: string;
    @Input({ required: true }) src!: string;

    @Output() clicked = new EventEmitter<void>();

    handleClick() {
        this.clicked.emit();
    }
}
