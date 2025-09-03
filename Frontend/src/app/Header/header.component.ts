import { Component, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  private lastScrollTop = 0;
  private headerVisible = true;
  
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    // Initialiser le header comme visible
    this.renderer.addClass(this.el.nativeElement.querySelector('.my-header'), 'header-visible');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const headerElement = this.el.nativeElement.querySelector('.my-header');
    
    // Si on est tout en haut de la page, header toujours visible
    if (currentScroll <= 0) {
      this.renderer.removeClass(headerElement, 'header-hidden');
      this.renderer.addClass(headerElement, 'header-visible');
      this.headerVisible = true;
      return;
    }
    
    // Déterminer la direction du scroll
    if (currentScroll > this.lastScrollTop && this.headerVisible) {
      // Scroll vers le bas et header visible : cacher le header
      this.renderer.removeClass(headerElement, 'header-visible');
      this.renderer.addClass(headerElement, 'header-hidden');
      this.headerVisible = false;
    } else if (currentScroll < this.lastScrollTop && !this.headerVisible) {
      // Scroll vers le haut et header caché : montrer le header
      this.renderer.removeClass(headerElement, 'header-hidden');
      this.renderer.addClass(headerElement, 'header-visible');
      this.headerVisible = true;
    }
    
    // Mettre à jour la dernière position de scroll
    this.lastScrollTop = currentScroll;
  }
}