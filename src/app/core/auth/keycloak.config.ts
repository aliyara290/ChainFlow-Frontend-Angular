import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloakUrl,
          realm: environment.keycloakRealm,
          clientId: environment.keycloakClientId,
        },
        initOptions: {
          flow: 'standard',
          onLoad: 'check-sso',
          checkLoginIframe: false,
          pkceMethod: 'S256',
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: ['/assets', '/public'],
        loadUserProfileAtStartUp: true,
      });
}
