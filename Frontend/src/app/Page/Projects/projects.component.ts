import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { ProjectComponent } from '../../Components/Project Card/project.component';

@Component({
    selector: 'app-projects',
    standalone: true,
    styleUrls: ['./projects.component.css'],
    templateUrl: './projects.component.html',
    imports: [HeaderComponent, HeroComponent, ProjectComponent],
})
export class ProjectsPage {}
