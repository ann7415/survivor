/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** header.component.ts
*/

import { Component, HostListener, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Button } from '../Components/Button/button.component';
import { Image } from '../Components/Image/image.component';
import { Router } from '@angular/router';
import { PaletteService, Palette } from '../services/palette.service';

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
    this.router.navigate([`/${page}`]);
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
  constructor(private router: Router) {}

  onLogin() {
    console.log("Login button clicked");
    this.router.navigate(['/login']);
  }

  onRegister() {
    console.log("Register button clicked");
    this.router.navigate(['/register']);
  }
}

// Component for the header
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ButtonsSelectPageComponent, RegisterLoginComponent, Image],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private lastScrollTop = 0;
  private headerVisible = true;
  currentPalette: Palette = 'given';
  
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private paletteService: PaletteService
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement.querySelector('.my-header'), 'header-visible');
    
    this.paletteService.palette$
      .pipe(takeUntil(this.destroy$))
      .subscribe(palette => {
        this.currentPalette = palette;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(page: string) {
    console.log(`Navigating to ${page}`);
    this.router.navigate([`/${page}`]);
  }

  onPaletteToggle(event: Event) {
    event.preventDefault();
    this.paletteService.togglePalette();
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