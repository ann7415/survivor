/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** home.component
*/

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { FooterComponent } from '../../Footer/footer';
import { BannerComponent } from '../../Components/Card/banner';
import { StartupsService } from '../../services/startups.service';
import { Startup } from '../../models/startup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  imports: [CommonModule, HeaderComponent, HeroComponent, FooterComponent, BannerComponent],
})
export class HomePage {
  private startupsService = inject(StartupsService);

  startups$: Observable<Startup[]> = this.startupsService.getStartups();
}
