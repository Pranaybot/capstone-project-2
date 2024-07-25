import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabGroupComponent } from "./tab-group/tab-group.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [RouterOutlet, TabGroupComponent, SignupFormComponent, LoginFormComponent],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  activeTab: string = 'signup'; // Default active tab

  onTabSelected(tab: string) {
    this.activeTab = tab;
  }

}
