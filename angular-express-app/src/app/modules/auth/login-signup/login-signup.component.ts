import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabGroupComponent } from "./tab-group/tab-group.component";
import { TabContentComponent } from "./tab-content/tab-content.component";

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [RouterOutlet, TabGroupComponent, TabContentComponent],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {

}
