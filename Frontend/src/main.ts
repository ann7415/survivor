/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** main
*/

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HomePage } from './app/Page/Home/home.component';
import { UnknownPage } from './app/Page/Unknown/unknown.component';
import { ProjectsPage } from './app/Page/Projects/projects.component';
import { NewsPage } from './app/Page/News/news.component';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'projects', component: ProjectsPage },
    { path: 'news', component: NewsPage },  
    { path: '**', component: UnknownPage },
];

bootstrapApplication(AppComponent, { providers: [provideRouter(routes)] }).catch(err => console.error(err));
