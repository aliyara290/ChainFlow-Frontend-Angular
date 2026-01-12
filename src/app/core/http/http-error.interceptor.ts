import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP interceptor to handle errors globally
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError((error) => {
            // Handle different error status codes
            switch (error.status) {
                case 401:
                    // Unauthorized - handled by auth interceptor
                    console.error('Unauthorized access - 401');
                    break;

                case 403:
                    // Forbidden - user doesn't have permission
                    console.error('Forbidden access - 403');
                    router.navigate(['/unauthorized']);
                    break;

                case 404:
                    // Not found
                    console.error('Resource not found - 404');
                    break;

                case 500:
                    // Internal server error
                    console.error('Internal server error - 500');
                    break;

                default:
                    // Other errors
                    console.error('HTTP error:', error);
            }

            // Re-throw the error so it can be handled by the calling code
            return throwError(() => error);
        })
    );
};
