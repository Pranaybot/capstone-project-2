import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isBrowser: boolean;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLoggedInFromCookies());
  private isHomeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsHomeFromCookies());

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Add these methods to retrieve logged in state and home state from cookies
  private getIsLoggedInFromCookies(): boolean {
    return this.isBrowser ? (this.cookieService.get('isLoggedIn') === 'true') : false;
  }
  
  private getIsHomeFromCookies(): boolean {
    return this.isBrowser ? (this.cookieService.get('isHome') === 'true') : false;
  }

  applyTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
    if (this.isBrowser) {
      this.cookieService.set('theme', theme);
    }
  }

  getSavedTheme(): string | null {
    return this.isBrowser ? this.cookieService.get('theme') : null;
  }

  applyBackgroundColor(color: string) {
    if (this.isBrowser) {
      this.cookieService.set('workspaceBackgroundColor', color);
    }
  }

  getSavedBackgroundColor(): string | null {
    return this.isBrowser ? this.cookieService.get('workspaceBackgroundColor') : null;
  }

  setLoggedInState(isLoggedIn: boolean) {
    if (this.isBrowser) {
      this.cookieService.set('isLoggedIn', String(isLoggedIn));
      this.isLoggedInSubject.next(isLoggedIn); // Update BehaviorSubject
    }
  }

  // Observable for isLoggedIn
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setHomeState(isHome: boolean) {
    if (this.isBrowser) {
      this.cookieService.set('isHome', String(isHome));
      this.isHomeSubject.next(isHome); // Update BehaviorSubject
    }
  }

  // Observable for isHome
  get isHome$(): Observable<boolean> {
    return this.isHomeSubject.asObservable();
  }

  setUserId(id: string) {
    if (this.isBrowser) {
      this.cookieService.set('userId', id); // Store user ID in cookie
    }
  }

  get userId(): string | null {
    return this.isBrowser ? this.cookieService.get('userId') : null;
  }

  deleteUserId(): void {
    if (this.isBrowser) {
      this.cookieService.delete('userId'); // Remove user ID from cookie on logout
    }
  }
  
}
