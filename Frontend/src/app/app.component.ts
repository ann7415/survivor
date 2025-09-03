import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {}
