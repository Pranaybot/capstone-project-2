import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/forms/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean; // Track login state
  isHome!: boolean;
  private subscriptions: Subscription = new Subscription(); // Manage subscription

  constructor(public userService: UserService) { }

  ngOnInit() {
    // Subscribe to loggedInStatus$
    // Get the current logged-in status once
    this.isLoggedIn = this.userService.getCurrentLoggedInStatus();
    this.isHome = this.userService.getHomeStatus();

    this.subscriptions.add(
      this.userService.loggedInStatus$.subscribe(loggedIn => {
        this.isLoggedIn = loggedIn; // Update based on user's authentication state
      })
    );

    // Subscribe to homeStatus$
    this.subscriptions.add(
      this.userService.homeStatus$.subscribe(home => {
        this.isHome = home; // Update based on home status
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Clean up all subscriptions
  }

  onLogout() {
    this.userService.logout();
  }
}