import "./App.css";
import Router from "./Router";
import { KeycloakProvider } from "./useKeycloak";

function App() {
  return (
    <KeycloakProvider>
      <Router />
    </KeycloakProvider>
  );
}

export default App;
