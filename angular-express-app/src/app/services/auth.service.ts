import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from "../services/base.service"


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(http: HttpClient) {
    super(http);
    this.checkLoginStatus();
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/logout`).pipe(
      map((response: any) => {
        this.loggedIn.next(false);
        return response;
      })
    );
  }
  

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private checkLoginStatus(): void {
    // Check the initial login status on service creation
    this.http.get(`${this.apiUrl}/user/check-login`).subscribe({
      next: (response: any) => {
        this.loggedIn.next(response.isLoggedIn);
      },
      error: () => {
        this.loggedIn.next(false);
      }
    });
  }
}
