/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** banner
*/

import { Component, Input } from '@angular/core';
import { Button } from '../Button/button.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [Button],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})
export class BannerComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) buttonText!: string;
  @Input({ required: true }) image!: string;
  @Input() customClass?: string;
}
