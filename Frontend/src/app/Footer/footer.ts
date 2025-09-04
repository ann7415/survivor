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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, Button],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {
  @Input() customClass: string = '';
  constructor(private router: Router, private authService: AuthService) {
  }

  navigateTo(page: string) {
    console.log(`Navigating to ${page}`);
    window.location.href = '/' + page;
  }

  logout() {
    this.authService.logout();
    window.location.href = '/home';
  }

  navigateToExternal(url: string) {
    console.log(`Opening external link: ${url}`);
    window.open(url, '_blank');
  }
}
