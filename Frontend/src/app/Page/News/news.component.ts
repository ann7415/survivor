/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** news.component
*/

import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { NewsComponent } from '../../Components/News Card/cardNews.component';
import { FooterComponent } from '../../Footer/footer';

@Component({
    selector: 'app-news',
    standalone: true,
    styleUrls: ['./news.component.css'],
    templateUrl: './news.component.html',
    imports: [HeaderComponent, HeroComponent, FooterComponent, NewsComponent],
})
export class NewsPage {}
