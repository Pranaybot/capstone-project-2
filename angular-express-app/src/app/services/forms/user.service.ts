import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ThemeService } from '../../services/settings/theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private loggedInStatus: BehaviorSubject<boolean>;
  private homeStatus: BehaviorSubject<boolean>;

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  constructor(
    http: HttpClient,
    private router: Router,
    public themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {
    super(http);
    this.loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn()); // Initialize with current login state
    this.homeStatus = new BehaviorSubject<boolean>(this.isHome()); // Initialize with current login state
  }

  // Use this to get the login state observable
  get loggedInStatus$() {
    return this.loggedInStatus.asObservable();
  }

  get homeStatus$() {
    return this.homeStatus.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isBrowser() ? localStorage.getItem('isLoggedIn') === 'true' : false;
  }

  isHome(): boolean {
    return this.isBrowser() ? localStorage.getItem('isHome') === 'true' : false;
  }

  signup(signupData: any) {
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          if (this.isBrowser()) {
            localStorage.setItem('isLoggedIn', 'true'); // Store the login state
            localStorage.setItem('isHome', 'false'); // Store the login state
            localStorage.setItem('userId', response.userId); // Store userId
            this.loggedInStatus.next(true); // Notify listeners
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
            localStorage.setItem('isLoggedIn', 'true'); // Store the login state
            localStorage.setItem('isHome', 'false'); // Store the login state
            localStorage.setItem('userId', response.userId); // Store userId
            this.loggedInStatus.next(true); // Notify listeners
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
          localStorage.removeItem('isLoggedIn'); // Clear the login state
          localStorage.removeItem('isHome'); 
          localStorage.removeItem('userId'); // Optionally clear userId
          this.loggedInStatus.next(false); // Notify listeners
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
            localStorage.removeItem('isLoggedIn'); // Clear the login state
            localStorage.removeItem('isHome'); // Store the login state
            localStorage.removeItem('userId'); // Optionally clear userId
            this.loggedInStatus.next(false); // Notify listeners
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

  getUserId(): string | null {
    return this.isBrowser() ? localStorage.getItem('userId') : null;
  }
}