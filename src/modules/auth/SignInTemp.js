import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

class SignIn extends Component {
  render() {
    return (
      <div style={styles.moduleSignInClosed} onClick={this.props.focusSignIn}>
        <p style={styles.header}>SIGN IN</p>
      </div>
    );
  }
}

const styles = {
  moduleSignInClosed: {
    width: "150px",
    minHeight: "300px",

    display: "flex",    
    flexDirection: "column",
   
    alignSelf: "center",
    justifyContent: "center",

    position: "relative",    
    transition: "width 0.75s ease",

    padding: "50px",
    backgroundImage: `linear-gradient(to left, #6fe5c9, #00bcd4), linear-gradient(#000000, #000000)`,
    borderRadius: "0px 6px 6px 0px",
  },
  header: {
    color: "#FFFFFF",
    fontSize: "22px",
    alignSelf: "center",
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


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
