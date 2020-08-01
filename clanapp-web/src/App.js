import React from "react";
import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Chapter from "./components/Chapter/Chapter";
import Login from "./components/Login/Login";
import User from "./components/User/User";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/chapter" component={Chapter} />
        <Route path="/user" component={User} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
