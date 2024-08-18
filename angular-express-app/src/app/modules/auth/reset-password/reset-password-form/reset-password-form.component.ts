import { Component, OnInit } from '@angular/core';
import { ResetPasswordHandler } from '../../../../shared/handlers/reset-password-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordFormService } from '../../../../services/forms/reset-password-form.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.scss'
})
export class ResetPasswordFormComponent implements OnInit{
  resetPasswordForm!: FormGroup;

  constructor(
    private resetPasswordHandler: ResetPasswordHandler,
    private resetPasswordService: ResetPasswordFormService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.resetPasswordService.createResetPasswordForm();
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordHandler.handleResetPassword(this.resetPasswordForm);
    } else {
      this.resetPasswordForm.markAllAsTouched();
      // Show validation error message
    }
  }
}
