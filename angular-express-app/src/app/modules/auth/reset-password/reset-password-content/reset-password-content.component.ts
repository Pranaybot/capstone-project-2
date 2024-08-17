import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ResetPasswordFormComponent } from '../reset-password-form/reset-password-form.component';

@Component({
  selector: 'app-reset-password-content',
  standalone: true,
  imports: [
    CommonModule,
    ResetPasswordFormComponent
  ],
  templateUrl: './reset-password-content.component.html',
  styleUrl: './reset-password-content.component.scss'
})
export class ResetPasswordContentComponent {

}
