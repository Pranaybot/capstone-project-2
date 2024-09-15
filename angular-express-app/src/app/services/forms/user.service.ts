import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ThemeService } from '../../services/settings/theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(
    http: HttpClient,
    private router: Router,
    public themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {
    super(http);
  }

  signup(signupData: any) {
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('isLoggedIn', 'true'); // Store the login state
          localStorage.setItem('userId', response.userId); // Store userId if needed
          this.router.navigate(['/work_area']);
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          return of(null);
        })
      )
      .subscribe();
  }

  login(loginData: any) {
    return this.http.post(`${this.apiUrl}/user/login`, loginData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('isLoggedIn', 'true'); // Store the login state
          localStorage.setItem('userId', response.userId); // Store userId if needed
          this.router.navigate(['/work_area']);
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          return of(null);
        })
      )
      .subscribe();
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        localStorage.removeItem('isLoggedIn'); // Remove the login state
        localStorage.removeItem('userId'); // Optionally clear userId
        this.router.navigate(['/']); // Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

  delete_account(): void {
    const currUserId = localStorage.getItem('userId');
    this.http.delete(`${this.apiUrl}/user/delete_account`, {
      body: { currUserId }, // Use the userId from localStorage
      observe: 'response' // This will return the full response in the Observable
    }).subscribe({
      next: () => {
        localStorage.removeItem('isLoggedIn'); // Remove the login state
        localStorage.removeItem('userId'); // Optionally clear userId
        this.router.navigate(['/']); // Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Failed to delete account', err);
      }
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}