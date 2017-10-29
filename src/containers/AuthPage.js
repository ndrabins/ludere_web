import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import SignUp from "../modules/SignUp";
import SignIn from "../modules/SignIn";

var backgroundImg = "../public/mountains.jpg"

const styles = {
  AuthPage: {
    width: "100%",
    height: "500px",
    backgroundImage: `url(${backgroundImg})`,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    minHeight:"100%",
    flexDirection:"row",
    overflow:"auto",
  },
}

class AuthPage extends Component {

  render() {
    return (
      <div style={styles.AuthPage}>
        <div className={this.props.SignUp}>
          <SignUp />
        </div>
        <div className={this.props.SignIn}>
          <SignIn />
        </div>
      </div>
    );
  }
}

AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthPage);
