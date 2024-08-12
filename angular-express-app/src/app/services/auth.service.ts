import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service";
import { Router } from "@angular/router";
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(http: HttpClient, private router: Router) {
    super(http);
    this.checkInitialLoginStatus();
  }

  private async checkInitialLoginStatus(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<{ error?: string }>(`${this.apiUrl}/user/check-login`));
      this.loggedInSubject.next(!response?.error);
    } catch (error) {
      console.log(error);
      this.loggedInSubject.next(false);
    }
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        this.loggedInSubject.next(false);
        this.router.navigate(["/"]); //Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return this.loggedInSubject.value;
  }
}
