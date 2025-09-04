/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** dashboard.component.ts
*/
// src/app/charts/line-demo.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './usersManagement.component.html',
  styleUrls: ['./usersManagement.component.css'],
  imports: [CommonModule],

})
export class usersManagement {
    private usersService = inject(UsersService);

  users$: Observable<User[]> = this.usersService.getUsers();

  updateUser(id: number, role: string): void {
    console.log(`Updating user with ID: ${id} to role: ${role}`);
  }
}
