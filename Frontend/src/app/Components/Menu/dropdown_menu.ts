
import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
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
  @Input() menu_name: string = "Sélectionner une option";
  @Input() multipleSelection: boolean = false;
  @Output() selectionChange = new EventEmitter<string | string[]>();
  selected: string | null = null;
  selectedMultiple: string[] = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    if (this.multipleSelection) {
      const index = this.selectedMultiple.indexOf(option);
      if (index > -1) {
        this.selectedMultiple.splice(index, 1);
      } else {
        this.selectedMultiple.push(option);
      }
      this.selectionChange.emit([...this.selectedMultiple]);
    } else {
      this.selected = option;
      this.isOpen = false;
      this.selectionChange.emit(option);
    }
  }

  isSelected(option: string): boolean {
    if (this.multipleSelection) {
      return this.selectedMultiple.includes(option);
    }
    return this.selected === option;
  }

  getDisplayText(): string {
    if (this.multipleSelection) {
      if (this.selectedMultiple.length === 0) {
        return this.menu_name;
      } else if (this.selectedMultiple.length === 1) {
        return this.selectedMultiple[0];
      } else {
        return `${this.selectedMultiple.length} sélectionnés`;
      }
    }
    return this.selected || this.menu_name;
  }
}