import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrls: ['./unknown.component.css'],
    templateUrl: './unknown.component.html',
    imports: [HeaderComponent, HeroComponent],
})
export class UnknownPage {}
