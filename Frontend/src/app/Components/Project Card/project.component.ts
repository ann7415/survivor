/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** project.component
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../Image/image.component';

@Component({
    selector: 'app-project',
    standalone: true,
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css'],
    imports: [Image],
})
export class ProjectComponent {
    @Input() alt?: string;
    @Input() customClass?: string;
    @Input({ required: true }) src!: string;
    @Input({ required: true }) companyName!: string;
    @Input({ required: true }) projectName!: string;
    @Input({ required: true }) description!: string;
    @Input() itemId?: number;
    @Input() itemType?: 'startup' | 'event';
    
    @Output() cardClick = new EventEmitter<{id: number, type: 'startup' | 'event'}>();

    onCardClick(): void {
        if (this.itemId && this.itemType) {
            this.cardClick.emit({ id: this.itemId, type: this.itemType });
        }
    }
}
