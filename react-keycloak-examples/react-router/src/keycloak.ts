import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: 'http://host.docker.internal:8080/auth/',
  realm: 'rockfeller',
  clientId: 'client_spa',
});

export default keycloak;
