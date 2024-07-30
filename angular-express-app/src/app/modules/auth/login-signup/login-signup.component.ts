import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabContentComponent } from './tab-content/tab-content.component';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TabGroupComponent,
    TabContentComponent
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
