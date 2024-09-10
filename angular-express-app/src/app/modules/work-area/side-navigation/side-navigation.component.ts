import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent extends BaseService{
  @Output() dashboardClick = new EventEmitter<void>();
  @Output() userClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  onDashboardClick() {
    this.router.navigate(['/']);
  }
  
  onUserClick() {
    this.userClick.emit();
  }
  
  onSettingsClick() {
    this.settingsClick.emit();
  }

}
