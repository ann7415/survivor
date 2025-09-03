import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Button } from '../Components/Button/button.component';
import { Image } from '../Components/Image/image.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, Button, Image],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {
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
