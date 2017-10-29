import React, { Component } from "react";

import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";

import Button from "material-ui/Button";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      showPassword: false
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
      <div style={styles.SignUp} className={classes.SignUp}>
        <h3>Get Started</h3>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="emails">Email</InputLabel>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">New Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
          <Input
            id="confirm_password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.confirm_password}
            onChange={this.handleChange("confirm_password")}
          />
        </FormControl>
        <Button raised color="primary" className={classes.button}>
          Sign Up
        </Button>
      </div>
    );
  }
}

const styles = {
  SignUp: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap"
  },
};

export default withStyles(styles)(SignUp);
