import { Component } from '@angular/core';
import { Header } from './Header/header.component';
import { FooterComponent } from './Footer/footer';
import { BannerComponent } from './Components/Card/banner';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./app.component.css'],
    template: `<app-header></app-header>
               <app-banner title="Prout" text="Bienvenue à notre incubateur" image="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" buttonText="Nous contacter"></app-banner>
               <app-footer></app-footer>`,
    imports: [Header, BannerComponent, FooterComponent],
})
export class App {}
