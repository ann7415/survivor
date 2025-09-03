import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HomePage } from './app/Home/home.component';
import { ProjectsPage } from './app/Projects/projects.component';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'projects', component: ProjectsPage },
    { path: 'news', component: ProjectsPage },
];

bootstrapApplication(AppComponent, { providers: [provideRouter(routes)] }).catch(err => console.error(err));
