/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** header.component.ts
*/
// src/app/Header/header.component.ts
import { Component, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Button } from '../Components/Button/button.component';
import { Image } from '../Components/Image/image.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

// Component for the selection of pages
@Component ({
  selector: 'app-select-page',
  standalone: true,
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
  standalone: true,
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
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ButtonsSelectPageComponent, RegisterLoginComponent, Image, CommonModule],
})
export class HeaderComponent implements OnInit {
  navigateTo(page: string) {
    console.log(`Navigating to ${page}`);
    window.location.href = '/' + page;
  }
  private lastScrollTop = 0;
  private headerVisible = true;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement.querySelector('.my-header'), 'header-visible');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const headerElement = this.el.nativeElement.querySelector('.my-header');

    if (currentScroll <= 0) {
      this.renderer.removeClass(headerElement, 'header-hidden');
      this.renderer.addClass(headerElement, 'header-visible');
      this.headerVisible = true;
      return;
    }

    if (currentScroll > this.lastScrollTop && this.headerVisible) {
      this.renderer.removeClass(headerElement, 'header-visible');
      this.renderer.addClass(headerElement, 'header-hidden');
      this.headerVisible = false;
    } else if (currentScroll < this.lastScrollTop && !this.headerVisible) {
      this.renderer.removeClass(headerElement, 'header-hidden');
      this.renderer.addClass(headerElement, 'header-visible');
      this.headerVisible = true;
    }

    this.lastScrollTop = currentScroll;
  }
}
