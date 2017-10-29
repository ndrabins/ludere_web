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

    this.handleSignUpHover = this.handleSignUpHover.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleLoginHover = this.handleLoginHover.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleMouseAway = this.handleMouseAway.bind(this);
    
    this.state = {
      initial: true,
      signUpHover: false,
      signUpClick: false,
      loginHover: false,
      loginClick: false,
    };
  }

  handleSignUpHover() {
    console.log('Sign Up Hover');    
    this.setState({initial: false});
    this.setState({signUpHover: true});
  }

  handleSignUpClick() {
    this.setState({signUpHover: false});
    this.setState({signUpClick: true});
    console.log('Sign Up Click');
  }

  handleLoginHover() {
    this.setState({initial: false});
    this.setState({loginHover: true});
    console.log('Login Hover');
  }

  handleLoginClick() {
    this.setState({loginHover: false});
    this.setState({loginClick: true});
    console.log('Login Click');
  }

  // handleMouseAway() {
  //   this.setState({initial: true});
  //   this.setState({signUpHover: false});
  //   this.setState({loginHover: false});
  //   console.log('Mouse Away');
  // }

  render() {
    return (
      <div className={this.props.classes.AuthPage}>
        <img src={logoWhite} alt="Logo" />
        <div className={this.props.classes.inputForm}>
          <div className={this.props.SignUp} onMouseOver={this.handleSignUpHover} onClick={this.handleSignUpClick}>
            <SignUp />
          </div>
          <div className={this.props.SignIn} onMouseOver={this.handleLoginHover} onClick={this.handleLoginClick}>
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
  }
}

export default withStyles(styles)(AuthPage);
