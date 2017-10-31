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
        <p style={styles.Header}>Get Started</p>
        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel} htmlFor="emails">Email</InputLabel>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
        </FormControl>
        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel} htmlFor="password">New Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
        </FormControl>
        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel} htmlFor="confirm_password">Confirm Password</InputLabel>
          <Input
            id="confirm_password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.confirm_password}
            onChange={this.handleChange("confirm_password")}
          />
        </FormControl>
        <br/>
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
    justifyContent: "left",
    alignItems: "center",
    minHeight: "300px",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    padding: "50px",
    backgroundImage: `linear-gradient(#303030, #303030)`,
    borderRadius: "6px 0px 0px 6px",
    opacity: 0.75,
    color: "white",
    fontFamily: "Roboto",
  },
  Header: {    
    alignSelf: "left",
    fontSize: "22px",
  },
  FormControl: {
    paddingBottom: "10px",
  },
  InputLabel: {
    color: "#FFFFFF",
  },
  firebaseUI1: {
    minWidth: "200px"
  }
};

export default withStyles(styles)(SignUp);
