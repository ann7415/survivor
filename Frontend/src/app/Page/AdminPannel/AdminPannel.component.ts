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
import { CommonModule } from '@angular/common';
import { SideBarAdminComponent } from '../../Components/SideBarAdmin/sideBarAdmin.component';

import { AuthGuardService } from '../../services/roleGuard.service';

import { dashboardPage } from '../../Components/AdminPannel/Dashboard/dashboard.component';
import { projectsManagement } from '../../Components/AdminPannel/Projects Management/projectsMangement.component';
import { usersManagement } from '../../Components/AdminPannel/Users Management/usersMangement.component';

@Component({
  selector: 'app-admin-pannel',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HeroComponent, SideBarAdminComponent, dashboardPage, projectsManagement, usersManagement, CommonModule],
  templateUrl: './AdminPannel.component.html',
  styleUrls: ['./AdminPannel.component.css'],
})
export class AdminPage {

  constructor(private authGuard: AuthGuardService) {
    if (!this.authGuard.canActivate('Admin')) {
      window.location.href = '/home';
    }
  }

  active: 'dashboard'|'projects'|'news'|'events'|'users' = 'dashboard';
  onNavigate(page: 'dashboard' | 'projects' | 'news' | 'events' | 'users') {
    this.active = page;
  }
}
