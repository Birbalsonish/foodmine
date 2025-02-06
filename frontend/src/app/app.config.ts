import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule

import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), // Add the authInterceptor to the HTTP client
    importProvidersFrom(
      BrowserAnimationsModule, // Required for animations
      ToastrModule.forRoot({
        timeOut: 3000, // Toast will disappear after 3 seconds
        positionClass: 'toast-bottom-right', // Toast appears at the bottom-right
        newestOnTop: false // Newest toast messages appear at the bottom
      }) // Configure ToastrModule with the forRoot method
    ),
  ],
};
