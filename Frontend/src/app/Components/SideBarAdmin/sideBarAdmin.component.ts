/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** sideBarAdmin.component
*/

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button  } from '../Button/button.component';
type AdminPage = 'dashboard'|'projects'|'news'|'events'|'users';

@Component({
    selector: 'app-side-bar-admin',
    standalone: true,
    templateUrl: './sideBarAdmin.component.html',
    styleUrls: ['./sideBarAdmin.component.css'],
    imports: [Button],
})
export class SideBarAdminComponent {
    @Input() customClass = '';

  @Input()  active: AdminPage = 'dashboard';
  @Output() navigate = new EventEmitter<AdminPage>();
  go(page: AdminPage) { console.log(page); this.navigate.emit(page);  }
}
