import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

/**
 * Auth guard to protect routes requiring authentication
 * Uses Keycloak's built-in authentication check
 */
export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  try {
    // Check if user is authenticated via Keycloak
    const isLoggedIn = await keycloak.isLoggedIn();

    if (!isLoggedIn) {
      console.warn('User not authenticated, redirecting to login');
      await keycloak.login({
        redirectUri: window.location.href,
      });
      return false;
    }

    // Check for required roles if specified in route data
    const requiredRoles = route.data['roles'] as string[] | undefined;

    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = keycloak.getUserRoles();
      const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasRequiredRole) {
        console.warn('User does not have required roles:', requiredRoles);
        router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Auth guard error:', error);
    router.navigate(['/login']);
    return false;
  }
};
