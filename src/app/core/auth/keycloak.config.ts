import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';

/**
 * Factory function to initialize Keycloak
 * Keycloak will handle token exchange and management directly
 */
export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: environment.keycloakUrl,
                realm: environment.keycloakRealm,
                clientId: environment.keycloakClientId,
            },
            initOptions: {
                // Use authorization code flow (standard flow)
                flow: 'standard',

                // Check if user is already logged in (SSO)
                onLoad: 'check-sso',

                // Don't check login iframe (can cause issues in some browsers)
                checkLoginIframe: false,

                // PKCE method for additional security
                pkceMethod: 'S256',
            },

            // Use Keycloak's bearer interceptor to automatically add tokens to requests
            enableBearerInterceptor: true,

            // Specify which URLs should have the bearer token
            bearerPrefix: 'Bearer',

            // Exclude auth endpoints from bearer token
            bearerExcludedUrls: ['/assets', '/public'],

            // Load user profile on startup
            loadUserProfileAtStartUp: true,
        });
}
