import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  activeTab: string = 'signup'; // Default active tab

  onTabSelected(tab: string) {
    this.activeTab = tab;
  }

}
