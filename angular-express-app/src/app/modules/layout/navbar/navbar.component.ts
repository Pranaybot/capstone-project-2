import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;  // Class property

  constructor(public authService: AuthService) {}

  async ngOnInit() {
    // Set the loggedIn variable based on the isLoggedIn method result
    this.loggedIn = await this.authService.checkLoginStatus();
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;  // Update the loggedIn status on logout
  }
}
