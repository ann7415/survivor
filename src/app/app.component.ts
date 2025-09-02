import { Component } from '@angular/core';
import { Header } from './Header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./app.component.css'],
    template: `<app-header></app-header>`,
    imports: [Header],
})
export class App {}
