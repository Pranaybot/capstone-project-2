import { Injectable } from '@angular/core';
import { UserService } from '../../services/forms/user.service';
import { FormGroup } from '@angular/forms';
import { AuthHandlerService } from './auth-handler';

@Injectable({
  providedIn: 'root'
})
export class LoginHandler {

  constructor(
    private userService: UserService,
    private authHandlerService: AuthHandlerService
  ) {}

  handleLogin(loginForm: FormGroup): void {
    const loginData = {
      username: loginForm.get('username')?.value,
      pwd: loginForm.get('pwd')?.value
    };

    this.userService.login(loginData).subscribe({
      next: () => {
        this.authHandlerService.handleAuthSuccess();
      },
      error: (errorResponse: any) => {
        this.authHandlerService.handleAuthError(errorResponse);
      }
    });
  }
}
