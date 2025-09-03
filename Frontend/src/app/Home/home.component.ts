import { Component } from '@angular/core';
import { Header } from '../Header/header.component';


@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./home.component.css'],
    template: `
        <app-header></app-header>
        <p>Home Page</p>
        `,
    imports: [Header,],
})
export class HomePage {}
