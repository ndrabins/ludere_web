import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import Button from "material-ui/Button";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPasssword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  renderSignIn(){
    if(this.props.loginTransition !== "SignIn"){
      return(
        <p style={styles.headerTemp}>SIGN IN</p>
      );
    }

    return (
      <div style={{display:'flex', flexDirection:"column"}}>
        <p style={styles.header}>Log In</p>
        <FormControl style={styles.formControl}>
          <InputLabel style={styles.inputLabel} htmlFor="emails">Email</InputLabel>
          <Input
            id="email"
            style={styles.inputText}
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </FormControl>
        <FormControl style={styles.formControl}>
          <InputLabel style={styles.inputLabel} htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            style={styles.inputText}
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </FormControl>
        <div style={styles.button}>
          <Button variant="raised" color="primary" onClick={() => this.props.actions.signInUser(this.state.email, this.state.password)}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={this.props.loginTransition==="SignIn" ? styles.moduleSignInOpen : styles.moduleSignInClosed} onClick={this.props.focusSignIn}>
        {this.renderSignIn()}
      </div>
    );
  }
}

const styles = {
  moduleSignInOpen: {
    position: "relative",
    transition: "width 0.4s ease",

    width: "350px",
    minHeight: "300px",

    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    overflow: "auto",

    alignSelf: "center",

    padding: "50px 100px",
    backgroundImage: `linear-gradient(to left, #6fe5c9, #00bcd4), linear-gradient(#000000, #000000)`,
    borderRadius: "0px 15px 15px 0px",
    color: "#FFFFFF",
  },
  moduleSignInClosed: {
    width: "150px",
    minHeight: "300px",

    display: "flex",
    flexDirection: "column",

    alignSelf: "center",
    justifyContent: "center",

    position: "relative",
    transition: "width 0.4s ease",

    padding: "50px",
    backgroundImage: `linear-gradient(to left, #6fe5c9, #00bcd4), linear-gradient(#000000, #000000)`,
    borderRadius: "0px 15px 15px 0px",
  },
  header: {
    alignSelf: "left",
    fontSize: "22px",
  },
  headerTemp: {
    color: "#FFFFFF",
    fontSize: "22px",
    alignSelf: "center",
  },
  formControl: {
    paddingBottom: "10px",
  },
  inputLabel: {
    color: "#FFFFFF",
  },
  inputText: {
    color: "#FFFFFF",
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "75px",
    alignSelf: "stretch",
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
