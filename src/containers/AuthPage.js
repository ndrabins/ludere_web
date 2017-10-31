import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import SignUp from "../modules/auth/SignUp";
import SignIn from "../modules/auth/SignIn";

import logoWhite from '../static/light.svg';
import backgroundImg from '../static/mountains.png';


class AuthPage extends Component {
  render() {
    return (
      <div className={this.props.classes.AuthPage}>
        <img src={logoWhite} alt="Logo" />
        <div className={this.props.classes.inputForm}>
          <div className={this.props.SignUp}>
            <SignUp />
          </div>
          <div className={this.props.SignIn}>
            <SignIn />
          </div>
        </div>
      </div>
    );
  }
}


const styles = {
  AuthPage: {
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: `url(${backgroundImg})`,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    flexDirection:"column",
  },
  inputForm: {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
  }
}

export default withStyles(styles)(AuthPage);
