/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** header.component
*/

import { Component } from '@angular/core';
import { Button } from '../Components/Button/button.component';
import { Image } from '../Components/Image/image.component';
import { Router } from '@angular/router';

// Component for the selection of pages
@Component ({
  selector: 'app-select-page',
  templateUrl: './selectedPage.component.html',
  imports: [Button],
  styleUrls: ['./header.component.css'],
})
export class ButtonsSelectPageComponent {
  constructor(private router: Router) {}

  navigateTo(page: string) {
    console.log(`Navigating to ${page}`);
    window.location.href = '/' + page;
  }
}

// Component for the login and registration buttons
@Component({
  selector: "app-login-register",
  templateUrl: './loginRegister.component.html',
  imports: [Button],
  styleUrls: ['./header.component.css'],
})
export class RegisterLoginComponent {
  onLogin() {
    console.log("Login button clicked");
    window.location.href = '/login';
  }

  onRegister() {
    console.log("Register button clicked");
    window.location.href = '/register';
  }
}

// Component for the header
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ButtonsSelectPageComponent, RegisterLoginComponent, Image],
})
export class HeaderComponent {}
