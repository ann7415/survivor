import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { ProjectComponent } from '../../Components/Project Card/project.component';

@Component({
    selector: 'app-about',
    standalone: true,
    styleUrls: ['./about.component.css'],
    templateUrl: './about.component.html',
    imports: [HeaderComponent, FooterComponent, HeroComponent, ProjectComponent],
})
export class AboutPage {}