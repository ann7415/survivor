/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** footer.ts
*/
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Button } from '../Components/Button/button.component';
import { Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, Button],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {
  @Input() customClass: string = '';
  constructor(private router: Router) {}

  navigateTo(page: string) {
    console.log(`Navigating to ${page}`);
    window.location.href = '/' + page;
  }

  navigateToExternal(url: string) {
    console.log(`Opening external link: ${url}`);
    window.open(url, '_blank');
  }
}
