import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../pages/Login";
import Products from "../pages/Products";
import { useKeycloak } from "../useKeycloak";
import PrivateRoute from "./PrivateRoute";

export default function Routes() {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Router>
      <Redirect from="/" to="/home" />
      <Route component={Login} exact path="/login" />
      <PrivateRoute exact path="/products" component={Products} />
    </Router>
  );
}
