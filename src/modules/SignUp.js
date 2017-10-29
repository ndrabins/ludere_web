import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import Button from 'material-ui/Button';

const styles = {
  SignUp: {
    width: "100%",
    height: "500px",
    alignSelf: "center",
    flexDirection: "column",    
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    overflow: "auto",
    paddingRight: 100,
    display: 'flex',
    flexWrap: 'wrap',
  },
};


class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: '',
    showPassword: false,    
  };
  
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
      <div style={styles.SignUp} className={classes.SignUp}>
        <h3>Get Started</h3>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="emails">Email</InputLabel>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </FormControl>
        <br/>
        <br/>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">New Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </FormControl>
        <br/>
        <br/>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
          <Input
            id="confirm_password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.confirm_password}
            onChange={this.handleChange('confirm_password')}
          />
        </FormControl>
        <br/>
        <br/>
        <Button raised color="primary" className={classes.button}>
          Sign Up
        </Button>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(SignUp);
