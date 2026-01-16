const gatewayUrl = 'http://localhost:8080';

export const environment = {
  production: false,
  gatewayUrl: gatewayUrl,
  supplierServiceUrl: `${gatewayUrl}/supply/api/v1/`,
  productionServiceUrl: `${gatewayUrl}/production/api/v1/`,
  customServiceUrl: `${gatewayUrl}/customer/api/v1/`,
  keycloakUrl: 'http://localhost:8090',
  keycloakClientId: 'frontend-client',
  keycloakRealm: 'supply-chain-system',
};
