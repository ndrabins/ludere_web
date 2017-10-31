import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import firebase from 'firebase';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import Dashboard from "./Dashboard";
import AuthPage from "./AuthPage";
import Home from "./Home";

function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/AuthPage', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/Dashboard' />}
    />
  )
}

class App extends Component {
  state = {
    authenticated: false,
    loading: true,
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //set user to logged in here
        console.log("logged in");
        this.setState({
          authenticated: true,
          loading: false,
        })
      } else {
        console.log("logged out");
        //put logged redux action here
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  render() {
    if(this.state.loading){
      console.log("loading...");
      return <div> loading </div>
    }
    return (
      <div className="App">
        <Router>
          <div style={{ height: "100%" }}>
            {/* this should be taken out soon */}

          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/AuthPage" component={AuthPage} /> */}
            <PublicRoute authenticated={this.state.authenticated} path='/AuthPage' component={AuthPage} />
            <PrivateRoute authenticated={this.state.authenticated} path='/Dashboard' component={Dashboard} />
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
