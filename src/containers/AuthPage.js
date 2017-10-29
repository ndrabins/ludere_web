import React, { Component } from "react";

import { withStyles } from "material-ui/styles";

import SignUp from "../modules/auth/SignUp";
import SignIn from "../modules/auth/SignIn";
import SocialSignIn from "../modules/auth/SocialSignIn";

import logoWhite from "../static/light.svg";
import backgroundImg from "../static/mountains.png";

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: true,
      signUpClick: false,
      loginClick: false
    };
  }

  handleSignUpClick() {
    this.setState({ initial: false });
    this.setState({ loginClick: false });
    this.setState({ signUpClick: true });
    console.log("Sign Up Click");
  }

  handleLoginClick() {
    this.setState({ initial: false });
    this.setState({ signUpClick: false });
    this.setState({ loginClick: true });
    console.log("Login Click");
  }

  render() {
    return (
      <div style={styles.AuthPage}>
        <div style={styles.entryContainer}>
          <img src={logoWhite} alt="Logo" />
          <div style={styles.inputForm}>
            <SignUp />
            <SignIn />
          </div>
          <SocialSignIn />
        </div>
      </div>
    );
  }
}

const styles = {
  AuthPage: {
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
    alignSelf: "center"
    // padding: "50px 100px 50px 100px",
  },
  SignUp: {
    ":hover": {
      transition: "1s",
      left: 0
    }
  },
  SignIn: {
    ":hover": {
      transition: "1s",
      right: 0
    }
  }
};

export default withStyles(styles)(AuthPage);
