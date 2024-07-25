import { Component } from '@angular/core';
import { SignupFormComponent } from "../signup-form/signup-form.component";
import { LoginFormComponent } from "../login-form/login-form.component";

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [SignupFormComponent, LoginFormComponent],
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.scss'
})
export class TabContentComponent {

}
