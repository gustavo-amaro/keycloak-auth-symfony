import React, { useContext, useState } from "react";
import { keycloak, keycloakConfig } from "./utils/auth";

// import { Container } from './styles';
const KeycloakContext = React.createContext({ keycloak: null });

export function useKeycloak() {
  const { keycloak, initialized } = useContext(KeycloakContext);

  return { keycloak, initialized };
}

export function KeycloakProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  keycloak
    .init(keycloakConfig)
    .then(() => {
      setInitialized(true);
    })
    .catch(() => console.log("erro na initialização do keycloak"));
  return (
    <KeycloakContext.Provider value={{ keycloak, initialized }}>
      {children}
    </KeycloakContext.Provider>
  );
}
