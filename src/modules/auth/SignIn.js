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

  render() {
    return (
      <div style={
        this.props.signInVisible
          ? styles.moduleSignInOpen
          : styles.moduleSignInClosed
        }
      >
        <p style={styles.header}>Log In</p>
        <FormControl style={styles.formControl}>
          <InputLabel style={styles.inputLabel} htmlFor="emails">Email</InputLabel>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </FormControl>
        <FormControl style={styles.formControl}>
          <InputLabel style={styles.inputLabel} htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </FormControl>
        <div style={styles.button}>
          <Button raised color="primary" style={styles.button} onClick={() => this.props.actions.signInUser(this.state.email, this.state.password)}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  moduleSignInClosed: {
    minWidth: "200px",
    minHeight: "300px",

    display: "flex",    
    flexWrap: "wrap",
    flexDirection: "column",
    overflow: "auto",

    alignSelf: "center",
    alignItems:"left",

    padding: "50px",
    backgroundImage: `linear-gradient(to left, #6fe5c9, #00bcd4), linear-gradient(#000000, #000000)`,
    borderRadius: "0px 6px 6px 0px",
    color: "white",
  },
  moduleSignInOpen: {
    position: "relative",
    width: "500px",
    transition: "width 0.75s ease",
  },
  header: {
    alignSelf: "left",
    fontSize: "22px",
  },
  formControl: {
    paddingBottom: "10px",
  },
  inputLabel: {
    color: "#FFFFFF",
  },
  button: {
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
