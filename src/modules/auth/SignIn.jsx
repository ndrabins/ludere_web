import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";

import Typography from "material-ui/Typography";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Fade from "material-ui/transitions/Fade";

import Button from "material-ui/Button";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showPassword: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  getSignInStyles = () => {
    const { classes, loginTransition } = this.props;
    if (loginTransition === "null") {
      return classes.noneSelected;
    } else if (loginTransition === "SignUp") {
      return classes.signUpSelected;
    } else {
      return classes.signInSelected;
    }
  };

  renderSignIn = () => {
    const { loginTransition, classes } = this.props;
    if (loginTransition === "null") {
      return (
        <div className={classes.noneSelected}>
          <Typography className={classes.headerText} variant="display1">
            SIGN IN
          </Typography>
        </div>
      );
    } else if (loginTransition === "SignUp") {
      return <div />;
    } else if (loginTransition === "SignIn") {
      return (
        <Fade in={true} timeout={{ enter: 1000, exit: 1000 }}>
          <div className={classes.signInContent}>
            <Typography className={classes.headerText} variant="display1">
              Sign In
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} shrink={true}>
                Email
              </InputLabel>
              <Input
                classes={{ focused: classes.inputFocused }}
                className={classes.input}
                value={this.state.value}
                onChange={this.handleChange("email")}
                autoFocus
                fullWidth
                disableUnderline
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} shrink={true}>
                Password
              </InputLabel>
              <Input
                type="password"
                classes={{ focused: classes.inputFocused }}
                className={classes.input}
                value={this.state.value}
                onChange={this.handleChange("password")}
                fullWidth
                disableUnderline
              />
            </FormControl>
          </div>
        </Fade>
      );
    }
  };

  render() {
    const { loginTransition, setFocus, classes } = this.props;

    return (
      <div className={classes.formContainer} onClick={() => setFocus("SignIn")}>
        <div className={this.getSignInStyles()}>{this.renderSignIn()}</div>
      </div>
    );
  }
}

const styles = {
  formContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    opacity: 1,
    background: `linear-gradient(270deg, #6FE5C9 0%, #00BCD4 100%)`,
    borderRadius: "0px 15px 15px 0px",
    padding: 10,
    height: "100%"
  },
  headerText: {
    color: "white",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    paddingBottom: 18
  },
  signUpSelected: {
    width: 80,
    transition: "width 0.4s ease-out"
  },
  noneSelected: {
    width: 320,
    transition: "width 0.4s ease-out",
    height: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  },
  signInSelected: {
    width: 400,
    transition: "width 0.4s ease-out",
    display: "flex",
    height: "100%"
  },
  signInContent: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 80,
    paddingRight: 80,
    width: "100%",
    paddingTop: 42,
  },
  formControl: {
    marginBotton: 10
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 5,
    color: "white",
    border: "1px solid #C3C3C3",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #f9f9f9"
    },
    marginBottom: 10
  },
  inputFocused: {
    border: "1px solid #FFF",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #FFF"
    },
  },
  label: {
    color: "#FFF"
  }
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SignUp)
);
