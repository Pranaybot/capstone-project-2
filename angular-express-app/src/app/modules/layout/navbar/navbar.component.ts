import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/forms/user.service';
import { ThemeService } from '../../../services/settings/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isHome: boolean = true;

  constructor(public userService: UserService, public themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.themeService.isHome$.subscribe(home => {
      this.isHome = home;
    });
  }

  onLogout() {
    this.userService.logout();
  }
}