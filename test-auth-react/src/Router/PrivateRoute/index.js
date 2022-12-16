import { useKeycloak } from "@react-keycloak/web";
import React, { useCallback } from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { keycloak, initialized } = useKeycloak();

  const render = useCallback(
    (props) => {
      console.log(keycloak);
      if (!!keycloak.authenticated) {
        return <Component {...props} />;
      }

      return <Redirect to={{ pathname: "/login", state: props.location }} />;
    },
    [keycloak]
  );

  return <Route render={render} {...rest} />;
}
