import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Redirect, useLocation } from "react-router-dom";

// import { Container } from './styles';

function Login() {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();

  if (!initialized) {
    return <h1>Carregando...</h1>;
  }

  if (!!keycloak.authenticated) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  keycloak.login({ redirectUri: `http://localhost:3000/products` });

  return <h1>Carregando...</h1>;
}

export default Login;
