import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',          // Balise HTML à utiliser : <app-banner>
  standalone: true,                      // Composant autonome
  templateUrl: './banner.html',  // Template HTML
  styleUrls: ['./banner.css']    // Styles CSS
})
export class BannerComponent {}      // Classe vide pour l'instant
