import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

import { routes } from './app.routes';
import { initializeKeycloak } from './core/auth/keycloak.config';
import { httpErrorInterceptor } from './core/http/http-error.interceptor';
import {authInterceptor} from './core/interceptor/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),


    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor, httpErrorInterceptor])
    ),

    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ]
};
