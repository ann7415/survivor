import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';

@Component({
    selector: 'app-home',
    standalone: true,
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html',
    imports: [HeaderComponent, HeroComponent],
})
export class HomePage {}
