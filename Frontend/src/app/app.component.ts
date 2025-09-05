/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** app.component
*/

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Header/header.component';
import { PaletteService } from './services/palette.service';

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
export class AppComponent implements OnInit {
  title = 'survivor';

  constructor(private paletteService: PaletteService) {}

  ngOnInit() {
  }
}