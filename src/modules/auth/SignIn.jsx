import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import ArrowIcon from "@material-ui/icons/KeyboardArrowRight";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import Dialog from "common/Dialog";
import LudereInput from "common/LudereInput";

import GoogleIcon from "../../static/google.svg";
import FacebookIcon from "react-icons/lib/fa/facebook";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showPassword: false,
      resetEmail: "",
      isResettingPassword: false
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

  handleCloseDialog = () => {
    this.setState({ isResettingPassword: false, resetEmail: "" });
  };

  handleOpenResetDialog = () => {
    this.setState({ isResettingPassword: true });
  };

  handleResetPassword = () => {
    const { resetEmail } = this.state;
    this.props.actions.resetPassword(resetEmail);
    this.handleCloseDialog();
  };

  renderSignIn = () => {
    const { loginTransition, classes, workspaceID, error } = this.props;
    const { email, password, resetEmail, isResettingPassword } = this.state;

    if (loginTransition === "null") {
      return (
        <Fade in={true} timeout={{ enter: 1000, exit: 1000 }}>
          <div className={classes.noneSelected}>
            <Typography className={classes.headerText} variant="display1">
              SIGN IN
            </Typography>
          </div>
        </Fade>
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
              <InputLabel
                FormLabelClasses={{
                  root: classes.label,
                  focused: classes.cssFocused
                }}
                shrink={true}
              >
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
              <InputLabel
                FormLabelClasses={{
                  root: classes.label,
                  focused: classes.cssFocused
                }}
                shrink={true}
              >
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
                onKeyPress={ev => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    this.props.actions.signInUser(email, password);
                    ev.preventDefault();
                  }
                }}
              />
              <FormHelperText
                className={classes.helperText}
                onClick={this.handleOpenResetDialog}
              >
                Forgot Password?
              </FormHelperText>
              <Dialog
                handleAction={this.handleResetPassword}
                open={isResettingPassword}
                handleClose={this.handleCloseDialog}
                titleName="Forgot password"
                actionButtonName="Confirm"
                color="linear-gradient(270deg, #6FE5C9 0%, #00BCD4 100%)"
                helperText=""
              >
                <LudereInput
                  autoFocus
                  label="Your email address"
                  value={resetEmail}
                  handleChange={this.handleChange("resetEmail")}
                  helperText="We will send an email with instruction on resetting your password. Please check both your inbox and spam folder."
                  onKeyPress={ev => {
                    if (ev.key === "Enter" && !ev.shiftKey) {
                      this.handleResetPassword();
                      ev.preventDefault();
                    }
                  }}
                />
              </Dialog>
            </FormControl>
            {error && <span className={classes.errorText}> {error} </span>}
            <div className={classes.buttonContainer}>
              <Button
                variant="raised"
                onClick={() =>
                  this.props.actions.authWithProvider("Google", workspaceID)
                }
                className={classes.googleButton}
              >
                <img
                  src={GoogleIcon}
                  alt="google icon"
                  className={classes.icon}
                />
                SIGN IN WITH GOOGLE
              </Button>
              <Button
                className={classes.facebookButton}
                variant="raised"
                onClick={() =>
                  this.props.actions.authWithProvider("Facebook", workspaceID)
                }
              >
                <FacebookIcon className={classes.icon} />
                SIGN IN WITH FACEBOOK
              </Button>
            </div>
            <IconButton
              className={classes.rightArrow}
              onClick={() => this.props.actions.signInUser(email, password)}
            >
              <ArrowIcon style={{ fontSize: 36 }} />
            </IconButton>
          </div>
        </Fade>
      );
    }
  };

  render() {
    const { setFocus, classes } = this.props;

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
    background: `linear-gradient(270deg, #6FE5C9 0%, #00BCD4 100%)`,
    borderRadius: "0px 15px 15px 0px",
    padding: 10,
    height: "100%"
  },
  headerText: {
    color: "white",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    paddingBottom: 18,
    minWidth: 200,
    textAlign: "center",
    textShadow: "1px 1px 1px rgba(0,0,0,0.24)"
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
    position: "relative"
  },
  formControl: {
    marginBotton: 10
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 5,
    color: "white",
    border: "1px solid #CECECE",
    overflow: "hidden",
    cursor: "text",
    transition: "border 0.25s ease-out",
    marginBottom: 10,
    "&:hover": {
      cursor: "text",
      border: "1px solid #f9f9f9"
    }
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
    "&$cssFocused": {
      color: "#FFF",
      fontWeight: "bold",
      textShadow: "1px 1px 1px rgba(0,0,0,0.24)"
    },
    color: "#FFF",
    textShadow: "1px 1px 1px rgba(0,0,0,0.24)"
  },
  cssFocused: {},
  rightArrow: {
    color: "white",
    position: "absolute",
    right: 0,
    bottom: 0
  },
  googleButton: {
    marginTop: 30,
    width: 240,
    background: "#FFF",
    color: "#6A6A6A"
  },
  facebookButton: {
    marginTop: 10,
    width: 240,
    background: "#2553B4",
    color: "#FFF",
    "&:hover": {
      background: "#446BBF"
    }
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    flexGrow: 1,
    marginBottom: 40
  },
  errorText: {
    color: "#e74c3c"
  },
  helperText: {
    marginTop: "-5px",
    color: "#303030",
    transition: "color 0.2s ease-out, text-decoration 0.2s ease-out",
    "&:hover": {
      color: "white",
      textDecoration: "underline"
    }
  }
};

function mapStateToProps(state) {
  return {
    error: state.auth.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUp));
