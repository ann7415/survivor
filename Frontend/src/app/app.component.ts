import { Component } from '@angular/core';
import { Header } from './Header/header.component';
import { FooterComponent } from './Footer/footer';
import { BannerComponent } from './Components/Card/banner';
import { ProjectComponent } from './Components/Project Card/project.component';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./app.component.css'],
    template: `
        <app-header></app-header>
        <app-banner title="Prout" text="Bienvenue à notre incubateur" image="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" buttonText="Nous contacter"></app-banner>
        <app-project src="https://angular.io/assets/images/logos/angular/angular.png" alt="Angular Logo" customClass="image-class" companyName="Google" projectName="Angular" description="A platform for building mobile and desktop web applications.A platform for building mobile and desktop web applications.A platform for building mobile and desktop web applications."></app-project>
        <app-footer></app-footer>
    `,
    imports: [Header, BannerComponent, FooterComponent, ProjectComponent],
})
export class App {}
