import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showLogOutButton: boolean = false;

  constructor(public userservice: UserService) {}

  ngOnInit(): void {
    this.checkLogoutButtonVisibility();
  }

  checkLogoutButtonVisibility() {
    if (this.userservice.isLoggedIn 
      && !this.userservice.isHome) {
      this.showLogOutButton = true;
    } else if (!this.userservice.isLoggedIn
      && this.userservice.isHome) {
      this.showLogOutButton = false;
    } 
  }

  onLogout() {
    this.userservice.logout();
    this.checkLogoutButtonVisibility();
  }
}
