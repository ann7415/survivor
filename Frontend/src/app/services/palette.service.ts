/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** palette.service.ts
*/

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Palette = 'given' | 'our';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {
  private renderer: Renderer2;
  private paletteSubject = new BehaviorSubject<Palette>('given');
  public palette$ = this.paletteSubject.asObservable();

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.loadPalette();
  }

  private loadPalette(): void {
    const savedPalette = localStorage.getItem('palette') as Palette;
    if (savedPalette) {
      this.setPalette(savedPalette);
    } else {
      this.setPalette('given');
    }
  }

  setPalette(palette: Palette): void {
    this.paletteSubject.next(palette);
    localStorage.setItem('palette', palette);
    
    // Remove existing palette classes
    this.renderer.removeClass(document.body, 'given-palette');
    this.renderer.removeClass(document.body, 'our-palette');
    
    // Add new palette class
    this.renderer.addClass(document.body, `${palette}-palette`);
  }

  togglePalette(): void {
    const currentPalette = this.paletteSubject.value;
    const newPalette: Palette = currentPalette === 'given' ? 'our' : 'given';
    this.setPalette(newPalette);
  }

  getCurrentPalette(): Palette {
    return this.paletteSubject.value;
  }
}