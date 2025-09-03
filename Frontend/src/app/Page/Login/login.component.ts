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
    selector: 'app-login',
    standalone: true,
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
    imports: [HeaderComponent, FooterComponent],
})
export class LoginPage {}
