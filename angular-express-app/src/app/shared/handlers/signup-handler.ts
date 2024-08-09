import { Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { AuthHandlerService } from './auth-handler';

@Injectable({
  providedIn: 'root'
})
export class SignupHandler {

  constructor(
    private userService: UserService,
    private authHandlerService: AuthHandlerService
  ) {}

  handleSignup(signupForm: FormGroup): void {
    const signupData = {
      firstName: signupForm.get('firstName')?.value,
      lastName: signupForm.get('lastName')?.value,
      username: signupForm.get('username')?.value,
      pwd: signupForm.get('pwd')?.value
    };

    this.userService.signup(signupData).subscribe({
      next: () => {
        this.authHandlerService.handleAuthSuccess();
      },
      error: (errorResponse) => {
        this.authHandlerService.handleAuthError(errorResponse);
      }
    });
  }
}
