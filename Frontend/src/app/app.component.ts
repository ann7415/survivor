import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./app.component.css'],
    template: `<app-header></app-header>`,
    imports: [RouterOutlet],
})
export class AppComponent {}
