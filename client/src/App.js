import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <Route
          path="/bubblePage"
          render={props => withAuthCheck(BubblePage, props)}
        />
      </div>
    </Router>
  );
}

function withAuthCheck(Component, props) {
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  }
  return <Redirect to="/" />;
}

export default App;
