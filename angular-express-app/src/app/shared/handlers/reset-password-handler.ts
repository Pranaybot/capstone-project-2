import { Injectable } from '@angular/core';
import { UserService } from '../../services/forms/user.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordHandler {

  constructor(
    private userService: UserService,
  ) {}

  handleResetPassword(resetPasswordForm: FormGroup): void {
    const resetPasswordData = {
      username: resetPasswordForm.get('username')?.value,
      old_pwd: resetPasswordForm.get('old_pwd')?.value,
      new_pwd: resetPasswordForm.get('new_pwd')?.value,
      new_pwd_match: resetPasswordForm.get('new_pwd_match')?.value
    };

    this.userService.resetPassword(resetPasswordData);
  }
}
