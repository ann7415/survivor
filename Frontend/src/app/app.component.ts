import { Component } from '@angular/core';
import { Header } from './Header/header.component';
import { FooterComponent } from './Footer/footer';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./app.component.css'],
    template: `<app-header></app-header>
               <app-footer></app-footer>`,
    imports: [Header, FooterComponent],
})
export class App {}
