import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/forms/user.service';
import { ThemeService } from '../services/settings/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public userservice: UserService, public themeservice: ThemeService) {}

  onLogout() {
    this.userservice.logout();
  }
}
