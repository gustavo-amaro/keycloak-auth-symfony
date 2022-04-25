import * as React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

interface PrivateRouteParams {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
  path: string
}

export function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteParams) {
  const { keycloak } = useKeycloak()

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
