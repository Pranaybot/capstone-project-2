import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginHandler {
  constructor(private router: Router, private userService: UserService) {}

  handleLogin(loginForm: FormGroup) {
    const loginData = loginForm.value; // Extract form data
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
