import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Products from "../pages/Products";
import { useKeycloak } from "../useKeycloak";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <h1>Carregando...</h1>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path="/login" />
        <PrivateRoute exact path="/products" component={Products} />
      </Switch>
    </BrowserRouter>
  );
}
