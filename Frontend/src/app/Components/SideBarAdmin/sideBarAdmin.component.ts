/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** sideBarAdmin.component
*/

import { Component, Input } from '@angular/core';
import { Button  } from '../Button/button.component';

@Component({
    selector: 'app-side-bar-admin',
    standalone: true,
    templateUrl: './sideBarAdmin.component.html',
    styleUrls: ['./sideBarAdmin.component.css'],
    imports: [Button],
})
export class SideBarAdminComponent {
    @Input() customClass = '';

    onClick(message: string) {
      console.log(message);
    }
}
