import React, { Component } from "react";

import { withStyles } from 'material-ui/styles';
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
    const { classes } = this.props;

    return (
      <div style={styles.SignIn} className={classes.SignIn}>
        <h3>Log In</h3>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="emails">Email</InputLabel>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </FormControl>
        <br/>
        <br/>
        <Button raised color="primary" className={classes.button}>
          Sign In
        </Button>
      </div>
    );
  }
}

const styles = {
  SignIn: {
    width: "100%",
    alignSelf: "center",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"300px",
    overflow:"auto",
    display: 'flex',
    flexWrap: 'wrap',
    padding: "50px 50px 50px 50px",
    backgroundImage: `linear-gradient(to left, #6fe5c9, #00bcd4), linear-gradient(#000000, #000000)`,
    borderRadius: "0px 6px 6px 0px",
    color: "white",    
  },
  firebaseUI1: {
    minWidth: "250px"
  }
};

export default withStyles(styles)(SignIn);
