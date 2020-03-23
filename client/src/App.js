import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Verify from "./components/auth/Verify";
import Generate from "./components/auth/generate";
import Changepass from "./components/auth/changepass";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateNavbar from "./components/private-route/PrivateNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import Board from "./components/dashboard/board";
import List from "./components/dashboard/List";
if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Switch>
              <PrivateNavbar  component={Navbar} />
            </Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />            
            <Route exact path="/verify" component={Verify} /> 
            <Route exact path="/Generate" component={Generate} /> 
            <Route exact path="/update" component={Changepass} /> 
            <Switch><PrivateRoute exact path="/board" component={Board} /> </Switch>
            <Switch><PrivateRoute exact path="/board/list" component={List} /> </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
