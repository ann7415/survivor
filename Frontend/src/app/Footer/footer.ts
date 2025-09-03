/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** footer
*/

import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from '../Components/Button/button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, Button],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {}
