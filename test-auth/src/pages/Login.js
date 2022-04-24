import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useKeycloak } from "../useKeycloak";

// import { Container } from './styles';

function Login() {
  const { keycloak } = useKeycloak();

  const location = useLocation();

  if (keycloak.authenticated) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  keycloak.login({ redirectUri: `http://localhost:3000/products` });

  return <h1>Login</h1>;
}

export default Login;
