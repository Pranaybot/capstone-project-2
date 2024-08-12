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
    return this.http.get(`${this.apiUrl}/user/logout`).pipe(
      map((response: any) => {
        this.router.navigate(["/"]);
      })
    );
  }
  
  async isLoggedIn():Promise<boolean> {
    try {
      const response = await lastValueFrom(this.http.get(`${this.apiUrl}/user/check-login`)).toPromise();
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
