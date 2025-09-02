import { Component, Input } from '@angular/core';
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
}
