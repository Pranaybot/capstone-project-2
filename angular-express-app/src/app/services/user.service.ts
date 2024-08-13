import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service"
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {
  isLoggedIn: boolean = false;
  isHome = true;

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  signup(signupData: any) {
    this.isLoggedIn = true;
    this.isHome = true;
    return this.http.post(`${this.apiUrl}/user/signup`, signupData, { responseType: 'json' });
  }

  login(loginData: any) {
    this.isLoggedIn = true;
    this.isHome = false;
    return this.http.post(`${this.apiUrl}/user/login`, loginData, { responseType: 'json' });
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.isHome = true;
        this.router.navigate(["/"]); //Navigate to home page on logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }
  
}
