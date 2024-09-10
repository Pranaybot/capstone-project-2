import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent {
  @Output() dashboardClick = new EventEmitter<void>();
  @Output() userClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();

  onDashboardClick() {
    this.dashboardClick.emit();
  }
  
  onUserClick() {
    this.userClick.emit();
  }
  
  onSettingsClick() {
    this.settingsClick.emit();
  }

}
