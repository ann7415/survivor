/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** main
*/

import { bootstrapApplication } from '@angular/platform-browser';
import { SearchPage } from './app/Page/Search/search.component';
import { EventPage } from './app/Page/Event/event.component';
import { AboutPage } from './app/Page/About/about.component';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

import { UnknownPage } from './app/Page/Unknown/unknown.component';
import { HomePage } from './app/Page/Home/home.component';
import { ProjectsPage } from './app/Page/Projects/projects.component';
import { NewsPage } from './app/Page/News/news.component';
import { LoginPage } from './app/Page/Login/login.component';
import { DashboardComponent } from './app/Page/Dashboard/dashboard.component';
import { StartupDetailComponent } from './app/Page/StartupDetail/startup-detail.component';
import { EventDetailComponent } from './app/Page/EventDetail/event-detail.component';
import { RegisterPage } from './app/Page/Register/register.component';

Chart.register(...registerables);

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'projects', component: ProjectsPage },
    { path: 'startup/:id', component: StartupDetailComponent },
    { path: 'advanced-search', component: SearchPage },
    { path: 'events', component: EventPage },
    { path: 'event/:id', component: EventDetailComponent },
    { path: 'about', component: AboutPage },
    { path: 'news', component: NewsPage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', component: UnknownPage },
];

bootstrapApplication(AppComponent, { providers: [provideRouter(routes), provideHttpClient()] }).catch(err => console.error(err));
