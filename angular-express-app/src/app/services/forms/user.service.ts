import { Injectable, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { ThemeService } from '../../services/settings/theme.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private isServer(): boolean {
    return !this.isBrowser();
  }

  constructor(
    http: HttpClient, 
    private router: Router,
    public themeService: ThemeService, 
    private snackBar: MatSnackBar,
    public auth: AuthService, 
    @Inject(DOCUMENT) public document: Document,
  ) {
    super(http);
  }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          if (!this.isServer()) {
            if (this.isBrowser()) {
              localStorage.setItem('userId', response.userId);
            }
            this.auth.loginWithRedirect();
          }
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          return of(null);
        })
      );
  }

  resetPassword(resetPasswordData: any): Observable<Object> {
    return this.http.patch(`${this.apiUrl}/user/auth/reset_password`, resetPasswordData, { responseType: 'json' })
      .pipe(
        tap(() => {
          if (!this.isServer()) {
            this.router.navigate(['/auth/login_signup']);
          }
        }),
        catchError((err: any) => {
          console.error('Reset Password failed', err);
          return throwError(() => err);
        })
      );
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, loginData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          if (!this.isServer()) {
            if (this.isBrowser()) {
              localStorage.setItem('userId', response.userId);
            }
            this.auth.loginWithRedirect();
          }
        }),
        catchError((err: any) => {
          const errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          return of(null);
        })
      );
  }

  logout(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isServer()) {
        this.http.get(`${this.apiUrl}/user/logout`).subscribe({
          next: () => {
            if (this.isBrowser()) {
              localStorage.removeItem('userId');
            }
            this.auth.logout({ 
              logoutParams: {
                returnTo: this.document.location.origin 
              }
            });
            resolve();
          },
          error: (err: any) => {
            console.error('Logout failed', err);
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  delete_account(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isServer()) {
        const currUserId = this.isBrowser() ? localStorage.getItem('userId') : null;

        if (currUserId) {
          this.http.delete(`${this.apiUrl}/user/delete_account`, {
            body: { currUserId },
            observe: 'response'
          }).subscribe({
            next: () => {
              if (this.isBrowser()) {
                localStorage.removeItem('userId');
              }
              this.auth.logout({ 
                logoutParams: {
                  returnTo: this.document.location.origin 
                }
              });
              resolve();
            },
            error: (err: any) => {
              console.error('Failed to delete account', err);
              resolve();
            }
          });
        } else {
          console.warn("User ID not available, cannot delete account.");
          resolve();
        }
      } else {
        resolve();
      }
    });
  }
}