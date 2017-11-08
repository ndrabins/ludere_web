import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import SignUp from "../modules/auth/SignUp";
import SignIn from "../modules/auth/SignIn";

import logoWhite from "../static/light.svg";
import backgroundImg from "../static/mountains.png";

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpVisible: false,
      signInVisible: false,
    };
  }

  toggleSignUp(){
    this.setState({ signUpVisible: !this.state.signUpVisible});
    console.log("Sign Up Click");
  }

  toggleSignIn(){
    this.setState({ signInVisible: !this.state.signInVisible});
    console.log("Sign In Click");
  }

  render() {
    return (
      <div style={styles.authPage}>
        <div style={styles.entryContainer}>
          <img src={logoWhite} alt="Logo" />
          <div style={styles.inputForm}>
            <SignUp onClick={this.props.toggleSignUp} toggleSignUp={() => this.toggleSignUp()}/>
            <SignIn onClick={this.props.toggleSignIn} toggleSignIn={() => this.toggleSignIn()}/>
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
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
