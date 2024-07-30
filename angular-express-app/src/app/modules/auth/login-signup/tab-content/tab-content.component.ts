import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [
    CommonModule,
    SignupFormComponent,
    LoginFormComponent
  ],
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.scss'
})
export class TabContentComponent {
  @Input() activeTab: string = 'signup';  // Default value
}
