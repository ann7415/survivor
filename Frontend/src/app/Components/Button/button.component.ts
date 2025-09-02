import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./button.component.css'],
})
export class Button {
  @Input({ required: true }) text!: string;
  @Input() customClass?: string;

  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
