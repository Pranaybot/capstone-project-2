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
  loggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription.add(
      this.authService.loggedIn$.subscribe(status => {
        this.loggedIn = status;
      })
    );
  }
  
  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
