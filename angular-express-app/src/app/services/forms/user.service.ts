import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ThemeService } from '../../services/settings/theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(http: HttpClient, private router: Router, public themeService: ThemeService) {
    super(http);
  }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          this.themeService.setLoggedInState(true); // User is logged in after signup
          this.themeService.setHomeState(false); // Set isHome based on your logic
          this.themeService.setUserId(response.userId); // Store user ID in cookie
        }),
        catchError((err: any) => {
          console.error('Signup failed', err);
          return throwError(() => err); // Updated to a factory function
        })
      );
  }

  resetPassword(resetPasswordData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/reset_password`, resetPasswordData, { responseType: 'json' })
      .pipe(
        catchError((err: any) => {
          console.error('Reset Password failed', err);
          return throwError(() => err); // Updated to a factory function
        })
      );
  }
  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, loginData, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          this.themeService.setLoggedInState(true); // User is logged in after signup
          this.themeService.setHomeState(false); // Set isHome based on your logic
          this.themeService.setUserId(response.userId); // Store user ID in cookie
        }),
        catchError((err: any) => {
          console.error('Login failed', err);
          return throwError(() => err); // Updated to a factory function
        })
      );
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
          this.themeService.setLoggedInState(false); // User is logged in after signup
          this.themeService.setHomeState(true); // Set isHome based on your logic
          this.themeService.deleteUserId(); // Remove user ID from cookie on logout
        this.router.navigate(['/']); // Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

  delete_account(): Observable<void> {
    const userId = this.themeService.userId;
    return this.http.delete(`${this.apiUrl}/user/delete_account`, {
        // Assuming userId should be sent as a parameter or in the request body
        body: { userId }, // If the userId needs to be sent in the body of the DELETE request
        observe: 'response' // This will return the full response in the Observable
    }).pipe(
        map(() => {
            // Map the response to void (you don't need to do anything with the response)
            return;
        }),
        catchError((err) => {
            // Handle error here if needed
            return throwError(() => err);
        })
    );
}

}
