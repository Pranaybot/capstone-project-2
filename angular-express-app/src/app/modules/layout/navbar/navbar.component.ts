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
  isLoggedIn: boolean = false; // Track login state
  isHome: boolean = true;
  private subscriptions: Subscription = new Subscription(); // Manage subscriptions effectively

  constructor(public userService: UserService) { }

  ngOnInit() {
    // Subscribe to loggedInStatus$
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