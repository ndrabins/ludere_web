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
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./firebaseUI.css"; // Import globally.

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  getSignUpStyles = () => {
    const { classes, loginTransition } = this.props;
    if (loginTransition === "null") {
      return classes.noneSelected;
    } else if (loginTransition === "SignUp") {
      return classes.signUpSelected;
    } else {
      return classes.signInSelected;
    }
  };

  renderSignUp = () => {
    const { loginTransition, classes } = this.props;
    if (loginTransition === "null") {
      return (
        <Typography className={classes.headerText} variant="display1">
          GET STARTED
        </Typography>
      );
    } else if (loginTransition === "SignUp") {
      return (
        <Fade in={true} timeout={{ enter: 1000, exit: 1000 }}>
          <div className={classes.signUpContent}>
            <Typography className={classes.headerText} variant="display1">
              Get Started
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
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} shrink={true}>
                Confirm Password
              </InputLabel>
              <Input
                type="password"
                classes={{ focused: classes.inputFocused }}
                className={classes.input}
                value={this.state.value}
                onChange={this.handleChange("confirmPassword")}
                fullWidth
                disableUnderline
              />
            </FormControl>
          </div>
        </Fade>
      );
    } else if (loginTransition === "SignIn") {
      return <div />;
    }
  };

  render() {
    const { loginTransition, setFocus, classes } = this.props;

    return (
      <div className={classes.formContainer} onClick={() => setFocus("SignUp")}>
        <div className={this.getSignUpStyles()}>{this.renderSignUp()}</div>
      </div>
    );
  }
}

const styles = {
  headerText: {
    color: "white",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    paddingBottom: 18
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#303030",
    opacity: 0.75,
    borderRadius: "15px 0px 0px 15px",
    padding: 10,
    height: "100%"
  },
  signUpSelected: {
    width: 400,
    transition: "width 0.4s ease-out",
    display: "flex",
    height: "100%"
    // justifyContent: "center"
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
    width: 80,
    transition: "width 0.4s ease-out"
  },
  signUpContent: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 80,
    paddingRight: 80,
    width: "100%",
    paddingTop: 42
  },
  formControl: {
    marginBotton: 10
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 5,
    color: "white",
    border: "1px solid #6D6D6D",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #C3C3C3"
    },
    marginBottom: 10
  },
  inputFocused: {
    border: "1px solid #FFF",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #FFF"
    }
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