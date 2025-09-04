/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** admin-pannel.component.ts
*/

import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { SideBarAdminComponent } from '../../Components/SideBarAdmin/sideBarAdmin.component';
import { dashboardPage } from '../Dashboard/dashboard.component';
@Component({
  selector: 'app-admin-pannel',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HeroComponent, SideBarAdminComponent, dashboardPage],
  templateUrl: './AdminPannel.component.html',
  styleUrls: ['./AdminPannel.component.css'],
})
export class AdminPage {}
