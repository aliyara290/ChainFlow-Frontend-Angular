import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap, catchError, of } from 'rxjs';
import { AuthService } from '../auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return from(authService.getAccessToken()).pipe(
    catchError((err) => {
      console.error('Failed to get token', err);
      return of(''); // Return empty token on error
    }),
    switchMap((token) => {
      const authReq = token
        ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
        : req;

      return next(authReq);
    })
  );
};
