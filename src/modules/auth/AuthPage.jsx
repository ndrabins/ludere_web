import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

import logoWhite from "../../static/light.svg";
import backgroundImg from "../../static/mountains.png";

class AuthPage extends Component {
  state = {
    loginTransition: "null"
  };

  setFocus = focus => {
    console.log(focus);
    this.setState({ loginTransition: focus });
  };

  render() {
    const { loginTransition } = this.state;

    return (
      <div style={styles.authPage}>
        <div style={styles.entryContainer}>
          <img
            src={logoWhite}
            alt="Logo"
            onClick={() => this.setFocus("null")}
          />
          <div style={styles.inputForm}>
            <SignUp
              setFocus={this.setFocus}
              loginTransition={loginTransition}
            />
            <SignIn
              setFocus={this.setFocus}
              loginTransition={loginTransition}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  authPage: {
    backgroundSize: "cover",
    height: "100%",
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
    marginTop: "20px",
    width: "620px",
    height: 500
  }
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
