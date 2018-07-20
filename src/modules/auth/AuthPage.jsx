import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

import Loading from "common/Loading";
import logoWhite from "../../static/light.svg";
import backgroundImg from "../../static/mountains.png";

class AuthPage extends Component {
  state = {
    loginTransition: "null",
    workspaceID: null
  };

  componentDidMount() {
    const { workspaceID } = this.props.match.params;
    if (workspaceID) {
      this.setState({ workspaceID: workspaceID });
    }
  }

  setFocus = focus => {
    this.setState({ loginTransition: focus });
  };

  render() {
    const { loading } = this.props;
    const { loginTransition, workspaceID } = this.state;

    if (loading) {
      return <Loading loadingDelay={false} />;
    }

    return (
      <div style={styles.authPage}>
        <div style={styles.entryContainer}>
          <img
            src={logoWhite}
            alt="Logo"
            style={styles.clickable}
            onClick={() => this.setFocus("null")}
          />
          <div style={styles.inputForm}>
            <SignUp
              setFocus={this.setFocus}
              loginTransition={loginTransition}
              workspaceID={workspaceID}
            />
            <SignIn
              setFocus={this.setFocus}
              loginTransition={loginTransition}
              workspaceID={workspaceID}
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
    overflow: "auto",
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
    height: 500,
    cursor: "pointer"
  },
  clickable: {
    cursor: "pointer"
  }
};

function mapStateToProps(state) {
  return {
    loading: state.auth.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
