import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service";
import { Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  
  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }
  
  // Inside the AuthService class
  async isLoggedIn(): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.http.get<{ error?: string }>(`${this.apiUrl}/user/check-login`));
      return !response?.error;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
