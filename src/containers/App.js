import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import {lightTheme, darkTheme} from "../utility/themes";
import { MuiThemeProvider } from "material-ui/styles";

import Loading from "../modules/auth/Loading";
import Main from "./Main";
import AuthPage from "./AuthPage";
import Home from "./Home";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        )}
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )}
    />
  );
}

class App extends Component {
  componentDidMount() {
    this.props.actions.verifyAuth();
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <div className="App">
        <MuiThemeProvider theme={lightTheme}>
          <Router>
            <div style={{ height: "100%" }}>
              <Switch>
                <PublicRoute
                  authenticated={this.props.authenticated}
                  path="/auth"
                  component={AuthPage}
                />
                <PrivateRoute
                  authenticated={this.props.authenticated}
                  path="/"
                  component={Main}
                >
                </PrivateRoute>
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    loading: state.auth.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
