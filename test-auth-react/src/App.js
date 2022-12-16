import { ReactKeycloakProvider } from "@react-keycloak/web";
import "./App.css";
import Router from "./Router";
import { keycloak, keycloakConfig } from "./utils/auth";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakConfig}>
      <Router />
    </ReactKeycloakProvider>
  );
}

export default App;
