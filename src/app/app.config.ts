import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

import { routes } from './app.routes';
import { initializeKeycloak } from './core/auth/keycloak.config';
import { httpErrorInterceptor } from './core/http/http-error.interceptor';
import { authInterceptor } from './core/interceptor/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor, httpErrorInterceptor])
    ),

    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ]
};
