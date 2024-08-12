import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
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
  
  isLoggedIn(): boolean {
    try {
      const response = await lastValueFrom(this.http.get(`${this.apiUrl}/user/check-login`));
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
