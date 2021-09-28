import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import ProductItemDetails from "./pages/ProductDetails/ProductDetaiils";
import SignUp from "./pages/Signup/SignUp";
import NotFound from "./pages/NotFound/NotFound"
import ProtectedRoute from "./componets/ProtectedRoute/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute exact path="/products/:id" component={ProductItemDetails} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
