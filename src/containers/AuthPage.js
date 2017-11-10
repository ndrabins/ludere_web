import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import SignUp from "../modules/auth/SignUp";
import SignIn from "../modules/auth/SignIn";
import SignUpTemp from "../modules/auth/SignUpTemp";
import SignInTemp from "../modules/auth/SignInTemp";

import logoWhite from "../static/light.svg";
import backgroundImg from "../static/mountains.png";

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginTransition: null,
    };
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  focusSignUp(){
    this.setState({ loginTransition: "SignUp"});
    console.log("Sign Up Click");
  }

  focusSignIn(){
    this.setState({ loginTransition: "SignIn"});
    console.log("Sign In Click");
  }

  focusNeutral(){
    this.setState({ loginTransition: "null"});
    console.log("Neutral Click");
  }

  render() {

    const loginTransition = this.state.loginTransition;
    
    let signUp = null;
    if (loginTransition === "SignUp") {
      signUp = <SignUp focusSignUp={() => this.focusSignUp()} loginTransition={this.state.loginTransition}/>
    } else {
      signUp = <SignUpTemp focusSignUp={() => this.focusSignUp()} loginTransition={this.state.loginTransition}/>
    }

    let signIn = null;
    if (loginTransition === "SignIn") {
      signIn = <SignIn focusSignIn={() => this.focusSignIn()} loginTransition={this.state.loginTransition}/>
    } else {
      signIn = <SignInTemp focusSignIn={() => this.focusSignIn()} loginTransition={this.state.loginTransition}/>
    }

    return (
      <div style={styles.authPage}>
        <div style={styles.entryContainer}>
          <img src={logoWhite} alt="Logo" />
          <div style={styles.inputForm}>
            <div style={styles.signUp}>
              {signUp}
            </div>
            <div style={styles.signIn}>
              {signIn}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  authPage: {
    backgroundSize: "cover",
    height: "100vh",
    overflow: "hidden",
    backgroundImage: `url(${backgroundImg})`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column"
  },
  entryContainer: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  inputForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: "20px",
  },
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
