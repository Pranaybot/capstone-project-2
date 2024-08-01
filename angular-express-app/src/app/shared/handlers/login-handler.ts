/*
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export class LoginHandler {
  constructor(private router: Router, private userService: UserService) {}

  handleLogin(loginData: any) {
    this.userService.login(loginData)
      .subscribe({
        next: (response: any) => this.onLoginSuccess(response),
        error: (error: any) => this.onLoginError(error)
      });
  }

  private onLoginSuccess(response: any) {
    console.log('Login successful:', response);
    // Optionally, redirect to a new page upon successful login
    this.router.navigate(['/work-area']); // Example: Navigate to '/work-area' after login
  }

  private onLoginError(error: any) {
    console.error('Login failed:', error);
    // Handle error scenarios, e.g., display error messages
  }
}
*/
