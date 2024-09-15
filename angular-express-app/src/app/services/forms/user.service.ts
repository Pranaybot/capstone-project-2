import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ThemeService } from '../../services/settings/theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  session: any = null;
  userId: any = null;
  constructor(http: HttpClient, private router: Router, 
    public themeService: ThemeService, private snackBar: MatSnackBar) {
    super(http);
  }

  signup(signupData: any) {
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          this.session = { curr_user: true };
          this.userId = response.userId;
          this.router.navigate(['/work_area']);
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          // Return an observable to handle the error
          return of(null); // or you could return an empty observable of appropriate type
        })
      )
      .subscribe(); // Ensure you subscribe to execute the observable
  }


  resetPassword(resetPasswordData: any) {
    return this.http.patch(`${this.apiUrl}/user/reset_password`, resetPasswordData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          this.router.navigate(['/login_signup']);
        }),
        catchError((err: any) => {
          console.error('Reset Password failed', err);
          return throwError(() => err); // Updated to a factory function
        })
      )
      .subscribe();
  }

  login(loginData: any) {
    return this.http.post(`${this.apiUrl}/user/login`, loginData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          this.session = { curr_user: true };
          this.userId = response.userId;
          this.router.navigate(['/work_area']);
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          // Return an observable to handle the error
          return of(null); // or you could return an empty observable of appropriate type
        })
      )
      .subscribe();
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        this.session = null;  // Clear the session
        this.userId = null;   // Clear the userId
        this.router.navigate(['/']); // Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

  delete_account(): void {
    const currUserId = this.userId;
    this.http.delete(`${this.apiUrl}/user/delete_account`, {
        // Assuming userId should be sent as a parameter or in the request body
        body: { currUserId }, // If the userId needs to be sent in the body of the DELETE request
        observe: 'response' // This will return the full response in the Observable
    }).subscribe({
      next: () => {
        this.session = null;  // Clear the session
        this.userId = null;   // Clear the userId
        this.router.navigate(['/']); // Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Failed to delete account', err);
      }
    });
  }

}
