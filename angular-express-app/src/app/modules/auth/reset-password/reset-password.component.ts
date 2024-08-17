import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ResetPasswordContentComponent } from './reset-password-content/reset-password-content.component';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ResetPasswordContentComponent
],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

}
