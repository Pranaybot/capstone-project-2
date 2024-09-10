import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  handleAuthSuccess(): void {
    this.router.navigate(['/work_area']);
  }

  handleResetPasswordSuccess(): void {
    this.router.navigate(['/login_signup']);
  }

  handleDeleteAccountSuccess(): void {
    this.router.navigate(['/']);
  }

  handleAuthError(errorResponse: any): void {
    const errorMessage = errorResponse?.error?.message || 
      'An unexpected error occurred. Please try again later.';
    this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
  }
  
}
