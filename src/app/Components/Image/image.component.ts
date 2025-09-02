import { Component, Input } from '@angular/core';
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
}
