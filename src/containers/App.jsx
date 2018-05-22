import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { lightTheme } from "../utility/themes"; //darkTheme
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ReactGA from "react-ga";

import Loading from "../common/LoadingLottie";
import Main from "./Main";
import AuthPage from "../modules/auth/AuthPage";
// import Home from "./Home";

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
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

class App extends Component {
  componentDidMount() {
    ReactGA.initialize("UA-118955959-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.actions.verifyAuth();
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <div style={{ height: "100%" }}>
          <Loading />
        </div>
      );
    }
    return (
      <div className="App">
        <CssBaseline />
        <MuiThemeProvider theme={lightTheme}>
          <Router>
            <div style={{ height: "100%" }}>
              <Switch>
                {/* this handles invites  */}
                <PublicRoute
                  authenticated={this.props.authenticated}
                  path="/auth/:workspaceID"
                  component={AuthPage}
                />
                <PublicRoute
                  authenticated={this.props.authenticated}
                  exact
                  path="/auth"
                  component={AuthPage}
                />
                <PrivateRoute
                  authenticated={this.props.authenticated}
                  path="/"
                  component={Main}
                />
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
    loading: state.auth.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
