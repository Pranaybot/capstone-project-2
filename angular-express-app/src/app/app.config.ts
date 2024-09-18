import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()), 
    provideAnimationsAsync(),
    CookieService,
    provideAuth0({
      "domain": "dev-346vw7zcsjxpe8gn.us.auth0.com",
      "clientId": "Js5CZN5XF6IEb9H49UOwgLOQyojZlN8R",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
};
