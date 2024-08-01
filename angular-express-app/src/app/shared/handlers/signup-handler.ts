/*
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export class SignupHandler {
  constructor(private router: Router, private userService: UserService) {}

  handleSignup(signupData: any) {
    this.userService.signup(signupData)
      .subscribe({
        next: (response: any) => this.onSignupSuccess(response),
        error: (error: any) => this.onSignupError(error)
      });
  }

  private onSignupSuccess(response: any) {
    console.log('Signup successful:', response);
    // Optionally, redirect to a new page upon successful signup
    this.router.navigate(['/work-area']); // Example: Navigate to '/work-area' after signup
  }

  private onSignupError(error: any) {
    console.error('Signup failed:', error);
    // Handle error scenarios, e.g., display error messages
  }
}
*/
