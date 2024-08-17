import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent {
  @Output() settingsClick = new EventEmitter<void>();

  onSettingsClick() {
    this.settingsClick.emit();
  }

}
