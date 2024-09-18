import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { ThemeService } from '../../services/settings/theme.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  constructor(
    http: HttpClient, private router: Router,
    public themeService: ThemeService, private snackBar: MatSnackBar,
    public auth: AuthService
  ) {
    super(http);
  }

  signup(signupData: any) {
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          if (this.isBrowser()) {
            localStorage.setItem('userId', response.userId); // Store userId
          }
          this.auth.loginWithRedirect();
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
            localStorage.setItem('userId', response.userId); // Store userId
          }
          this.auth.loginWithRedirect();
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
          localStorage.removeItem('userId'); // Optionally clear userId
        }
        this.auth.logout({ 
          logoutParams: {
            returnTo: this.document.location.origin 
          }
        });
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
            localStorage.removeItem('userId'); // Optionally clear userId
          }
          this.auth.logout({ 
            logoutParams: {
              returnTo: this.document.location.origin 
            }
          });
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
