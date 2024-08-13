import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service";
import { Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  isLoggedIn: boolean = false;
  isHome = false;

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  /*
  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  async checkLoginStatus(): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.http.get<{ error?: string }>(`${this.apiUrl}/user/check-login`));
      const isNotEmpty = Object.keys(response).length > 0;
      return isNotEmpty;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        this.router.navigate(["/"]); //Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }
  */

}
