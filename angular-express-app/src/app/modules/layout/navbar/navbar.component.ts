import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false; // Track login state
  private subscription!: Subscription;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.loggedInStatus$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; // Update based on user's authentication state
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Clean up subscription
  }

  onLogout() {
    this.userService.logout();
  }
}