import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupHandler {
  constructor(private router: Router, private userService: UserService) {}

  handleSignup(signupForm: FormGroup): Observable<any> {
    const signupData = signupForm.value; // Extract form data
    return this.userService.signup(signupData);
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
