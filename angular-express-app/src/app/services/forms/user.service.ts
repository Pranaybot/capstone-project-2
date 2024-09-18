import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { ThemeService } from '../../services/settings/theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  isLoggedIn: boolean = false;
  isHome: boolean = true;

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  constructor(
    http: HttpClient, private router: Router,
    public themeService: ThemeService, private snackBar: MatSnackBar
  ) {
    super(http);
  }

  signup(signupData: any) {
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          if (this.isBrowser()) {
            this.isLoggedIn = true;
            this.isHome = false;
            localStorage.setItem('userId', response.userId); // Store userId
          }
          this.router.navigate(['/work_area']);
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          return of(null); // Handle the error
        })
      )
      .subscribe(); // Ensure you subscribe to execute the observable
  }

  resetPassword(resetPasswordData: any) {
    return this.http.patch(`${this.apiUrl}/user/reset_password`, resetPasswordData, { responseType: 'json' })
      .pipe(
        tap(() => {
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
          if (this.isBrowser()) {
            this.isLoggedIn = true;
            this.isHome = false;
            localStorage.setItem('userId', response.userId); // Store userId
          }
          this.router.navigate(['/work_area']);
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          return of(null); // Handle the error
        })
      )
      .subscribe();
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        if (this.isBrowser()) {
          this.isLoggedIn = false;
          this.isHome = true;
          localStorage.removeItem('userId'); // Optionally clear userId
        }
        this.router.navigate(['/']); // Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

  delete_account(): void {
    const currUserId = this.isBrowser() ? localStorage.getItem('userId') : null; // Get userId from localStorage

    if (currUserId) {
      this.http.delete(`${this.apiUrl}/user/delete_account`, {
        body: { currUserId }, // Assuming userId should be sent as a parameter in the request body
        observe: 'response' // This will return the full response in the Observable
      }).subscribe({
        next: () => {
          if (this.isBrowser()) {
            this.isLoggedIn = false;
            this.isHome = true;
            localStorage.removeItem('userId'); // Optionally clear userId
          }
          this.router.navigate(['/']); // Navigate to home page on delete account
        },
        error: (err: any) => {
          console.error('Failed to delete account', err);
        }
      });
    } else {
      console.warn("User ID not available, cannot delete account.");
    }
  }

}
