import { Component } from '@angular/core';
import { Header } from '../Header/header.component';


@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./projects.component.css'],
    template: `
        <app-header></app-header>
        <p>Projects Page</p>
        `,
    imports: [Header,],
})
export class ProjectsPage {}
