import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { HomePage } from './app/Page/Home/home.component';
import { UnknownPage } from './app/Page/Unknown/unknown.component';
import { ProjectsPage } from './app/Page/Projects/projects.component';
import { Routes, provideRouter } from '@angular/router';
import { SearchPage } from './app/Page/Search/search.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'projects', component: ProjectsPage },
    { path: 'search', component: SearchPage },
    { path: '**', component: UnknownPage },
];

bootstrapApplication(AppComponent, { 
    providers: [
        provideRouter(routes),
        provideHttpClient()
    ] 
}).catch(err => console.error(err));
