import { Component, Input } from '@angular/core';
import { Image } from '../Image/image.component';

@Component({
    standalone: true,
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    imports: [Image]
})
export class NewsComponent {
    @Input({required: true}) title!: string;
    @Input({required: true}) imageUrl!: string;
}
