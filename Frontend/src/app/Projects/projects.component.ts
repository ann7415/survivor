/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** projects.component.ts
*/
import { Component } from '@angular/core';
import { HeaderComponent } from '../Header/header.component';


@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./projects.component.css'],
    template: `
        <app-header></app-header>
        <p>Projects Page</p>
        `,
    imports: [HeaderComponent],
})
export class ProjectsPage {}
