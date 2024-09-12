import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isBrowser: boolean;

  // Subjects to hold the logged-in state and home state
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isHomeSubject = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
      this.isLoggedInSubject.next(isLoggedIn); // Update the BehaviorSubject
    }
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable(); // Return as observable
  }

  setHomeState(isHome: boolean) {
    if (this.isBrowser) {
      this.cookieService.set('isHome', String(isHome));
      this.isHomeSubject.next(isHome); // Update the BehaviorSubject
    }
  }

  get isHome$(): Observable<boolean> {
    return this.isHomeSubject.asObservable(); // Return as observable
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
