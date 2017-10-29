import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import SignUp from "../modules/auth/SignUp";
import SignIn from "../modules/auth/SignIn";
import SocialSignIn from "../modules/auth/SocialSignIn";

import logoWhite from '../static/light.svg';
import backgroundImg from '../static/mountains.png';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      initial: true,
      signUpClick: false,
      loginClick: false,
    };
  }

  handleSignUpClick() {
    this.setState({initial: false});
    this.setState({loginClick: false});
    this.setState({signUpClick: true});    
    console.log('Sign Up Click');
  }    

  handleLoginClick() {
    this.setState({initial: false});
    this.setState({signUpClick: false});    
    this.setState({loginClick: true});
    console.log('Login Click');
  }

  render() {
    return (
      <div className={this.props.classes.AuthPage}>
        <img src={logoWhite} alt="Logo" />
        <div className={this.props.classes.inputForm}>
          <div className={this.props.SignUp} onClick={() => this.handleSignUpClick()}>
            <SignUp />
          </div>
          <div className={this.props.SignIn} onClick={() => this.handleLoginClick()}>
            <SignIn />
          </div>
        </div>
        <SocialSignIn />
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
    // padding: "50px 100px 50px 100px",
  },
  SignUp: {
    ':hover': {
      transition: "1s",
      left: 0,
    },
  },
  SignIn: {
    ':hover': {
      transition: "1s",
      right: 0,
    },
  },
}

export default withStyles(styles)(AuthPage);
