import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/forms/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public userService: UserService) {}

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  onLogout() {
    this.userService.logout();
  }
}