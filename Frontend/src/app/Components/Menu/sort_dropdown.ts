import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SortOption = 'none' | 'alphabetical' | 'reverse-alphabetical';

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort_dropdown.html',
  styleUrls: ['./sort_dropdown.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SortDropdownComponent {
  isOpen = false;
  
  @Input() placeholder: string = "Trier par nom";
  @Input() showResetOption: boolean = true;
  @Output() sortChange = new EventEmitter<SortOption>();
  
  currentSort: SortOption = 'none';

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

  selectSort(sortOption: SortOption) {
    this.currentSort = sortOption;
    this.isOpen = false;
    this.sortChange.emit(sortOption);
  }

  getCurrentSortText(): string {
    switch (this.currentSort) {
      case 'alphabetical':
        return 'A → Z';
      case 'reverse-alphabetical':
        return 'Z → A';
      default:
        return this.placeholder;
    }
  }

  getSortIcon(): string {
    switch (this.currentSort) {
      case 'alphabetical':
        return '▲';
      case 'reverse-alphabetical':
        return '▼';
      default:
        return '↕';
    }
  }
}
