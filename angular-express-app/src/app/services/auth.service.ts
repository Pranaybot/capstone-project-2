import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from "../services/base.service"
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  
  constructor(http: HttpClient) {
    super(http);
    private router: Router;
  }

  logout(): void {
    this.http.get(`${this.apiUrl}/user/logout`).subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
  }
  
  async isLoggedIn():Promise<boolean> {
    try {
      const response = await this.http.get<{ error?: string }>(`${this.apiUrl}/user/check-login`).toPromise();
      if (response.error) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
