
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown_menu.html',
  styleUrls: ['./dropdown_menu.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DropdownMenuComponent {
  isOpen = false;
  @Input() options: string[] = ['Web', 'Ecologie', 'Entreprise'];
  @Output() selectionChange = new EventEmitter<string>();
  selected: string | null = null;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selected = option;
    this.isOpen = false;
    this.selectionChange.emit(option);
  }
}