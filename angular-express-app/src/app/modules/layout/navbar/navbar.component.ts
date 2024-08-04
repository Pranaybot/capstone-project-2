import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  logout() {
    this.authService.logout();
    window.location.href = '/logout'; // Redirect to logout route
  }
}
