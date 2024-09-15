import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isBrowser: boolean;

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
  
}
