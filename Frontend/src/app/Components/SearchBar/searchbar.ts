/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** searchbar
*/

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  templateUrl: './searchbar.html',
  styleUrls: ['./searchbar.css']
  , imports: [FormsModule]
})
export class SearchbarComponent {
  searchText: string = '';

  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchText);
  }
}
