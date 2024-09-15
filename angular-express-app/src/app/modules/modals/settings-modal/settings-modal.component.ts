import { Component, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../../services/settings/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SettingsModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() backgroundColorChange = new EventEmitter<string>();
  @Output() themeChange = new EventEmitter<string>();

  colors = ['#bb86fc', '#ff8a5c', '#a0e4f2', '#f5f5f5', '#ffcf6c'];
  currentTheme: string = 'light'; // default theme

  constructor(private themeService: ThemeService) { }

  // Close the settings modal
  closeSettingsModal() {
    this.close.emit();
  }

  // Change workspace background color
  changeBackgroundColor(color: string) {
    this.backgroundColorChange.emit(color); // Notify the parent component about the color change
    this.themeService.applyBackgroundColor(color);
    this.closeSettingsModal();
  }

  // Change theme
  changeTheme(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Cast the target to HTMLSelectElement
    this.currentTheme = selectElement.value; // Now TypeScript knows it's a select element with a value
    this.themeChange.emit(this.currentTheme); // Notify the parent component about the theme change
    this.themeService.applyTheme(this.currentTheme);
  }
}