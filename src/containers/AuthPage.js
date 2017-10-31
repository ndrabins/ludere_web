import React, { Component } from "react";

import { withStyles } from "material-ui/styles";

import SignUp from "../modules/auth/SignUp";
import SignIn from "../modules/auth/SignIn";

import logoWhite from "../static/light.svg";
import backgroundImg from "../static/mountains.png";

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: true,
      signUpClick: false,
      signInClick: false
    };
  }

  handleSignUpClick = () => {
    this.setState({ initial: false });
    this.setState({ signInClick: false });
    this.setState({ signUpClick: true });
    console.log("Sign Up Click");
  }

  handleSignInClick = () => {
    this.setState({ initial: false });
    this.setState({ signUpClick: false });
    this.setState({ signInClick: true });
    console.log("Sign In Click");
  }

  render() {
    return (
      <div style={styles.AuthPage}>
        <div style={styles.entryContainer}>
          <img src={logoWhite} alt="Logo" />
          <br />
          <div style={styles.inputForm}>
            <SignUp />
            <SignIn />
          </div>
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
  },
  // SignUp: {
  //   ":hover": {
  //     transition: "1s",
  //     left: 0
  //   }
  // },
  // SignIn: {
  //   ":hover": {
  //     transition: "1s",
  //     right: 0
  //   }
  // }
};

export default withStyles(styles)(AuthPage);
