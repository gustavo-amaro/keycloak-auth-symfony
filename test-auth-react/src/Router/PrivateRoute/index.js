import React, { useCallback } from "react";
import { Route, Redirect } from "react-router-dom";
import { useKeycloak } from "../../useKeycloak";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { keycloak } = useKeycloak();

  const render = useCallback(
    (props) => {
      console.log(keycloak.authenticated);
      if (!!keycloak.authenticated) {
        return <Component {...props} />;
      }

      return <Redirect to={{ pathname: "/login", state: props.location }} />;
    },
    [keycloak]
  );
  return <Route render={render} {...rest} />;
}
