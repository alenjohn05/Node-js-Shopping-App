import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/login" component={LoginForm} /> */}
        <Route exact path="/" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
