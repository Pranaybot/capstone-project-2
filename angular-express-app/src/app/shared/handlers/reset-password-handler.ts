import { Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { AuthHandlerService } from './auth-handler';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordHandler {

  constructor(
    private userService: UserService,
    private authHandlerService: AuthHandlerService
  ) {}

  handleResetPassword(resetPasswordForm: FormGroup): void {
    const resetPasswordData = {
      old_pwd: resetPasswordForm.get('old_pwd')?.value,
      new_pwd: resetPasswordForm.get('new_pwd')?.value,
      new_pwd_match: resetPasswordForm.get('new_pwd')?.value
    };

    this.userService.resetPassword(resetPasswordData).subscribe({
      next: () => {
        this.authHandlerService.handleResetPasswordSuccess();
      },
      error: (errorResponse) => {
        this.authHandlerService.handleResetPasswordError(errorResponse);
      }
    });
  }
}
