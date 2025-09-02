import { Component } from '@angular/core';
import { Header } from './Header/header.component';
import { ProjectComponent } from './Components/Project Card/project.component';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./app.component.css'],
    template: `
        <app-header></app-header>
        <app-project src="https://angular.io/assets/images/logos/angular/angular.png" alt="Angular Logo" customClass="image-class" companyName="Google" projectName="Angular" description="A platform for building mobile and desktop web applications.A platform for building mobile and desktop web applications.A platform for building mobile and desktop web applications."></app-project>
    `,
    imports: [Header, ProjectComponent],
})
export class App {}
