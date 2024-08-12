import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(public authService: AuthService) {}

  async ngOnInit() {
    this.loggedIn = await this.authService.isLoggedIn();
  }
  
  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }

}
