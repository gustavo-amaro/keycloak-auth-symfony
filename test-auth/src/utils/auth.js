import Keycloak from "keycloak-js";

const keycloakCredentials = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON);

export const keycloak = Keycloak({
  url: keycloakCredentials["auth-server-url"],
  realm: keycloakCredentials["realm"],
  clientId: keycloakCredentials["resource"],
});

export const keycloakConfig = {
  onLoad: "check-sso", //login-required vs check-sso
  checkLoginIframe: false,
};
