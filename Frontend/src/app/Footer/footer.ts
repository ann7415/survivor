import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from '../Components/Button/button.component';
import { Image } from '../Components/Image/image.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, Button, Image],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {}
