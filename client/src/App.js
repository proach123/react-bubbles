import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ColorList from './components/ColorList'
import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

        <Route exact path="/login" component={Login} />
        <PrivateRoute path = '/protected' component = {BubblePage} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
