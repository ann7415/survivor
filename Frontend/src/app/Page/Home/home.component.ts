/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** home.component
*/

import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { FooterComponent } from '../../Footer/footer';
import { BannerComponent } from '../../Components/Card/banner';

@Component({
    selector: 'app-home',
    standalone: true,
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html',
    imports: [HeaderComponent, HeroComponent, FooterComponent, BannerComponent],
})
export class HomePage {}
