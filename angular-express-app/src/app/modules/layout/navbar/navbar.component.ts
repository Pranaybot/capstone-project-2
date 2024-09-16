import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/forms/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(public userService: UserService) {
    this.isAuthenticated$ = this.userService.isAuthenticated$;
  }

  onLogout() {
    this.userService.logout();
  }
}