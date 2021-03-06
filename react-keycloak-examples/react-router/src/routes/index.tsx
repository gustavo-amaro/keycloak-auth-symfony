import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'

import { PrivateRoute } from './utils'
import Products from '../pages/Products'

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      {/*<Redirect from="/" to="/home" />*/}
      <PrivateRoute path="/home" component={HomePage} />
      <PrivateRoute path="/products" component={Products} />
      <Route path="/login" component={LoginPage} />
    </Router>
  )
}
