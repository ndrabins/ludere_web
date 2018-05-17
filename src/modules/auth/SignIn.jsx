import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Input, { InputLabel } from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import ArrowIcon from "@material-ui/icons/KeyboardArrowRight";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import GoogleIcon from "../../static/google.svg";
import TwitterIcon from "react-icons/lib/fa/twitter";
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
    const { email, password } = this.state;

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
              />
            </FormControl>
            <div className={classes.buttonContainer}>
              <Button
                variant="raised"
                onClick={() => this.props.actions.authWithProvider("Google")}
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
                className={classes.twitterButton}
                variant="raised"
                onClick={() => this.props.actions.authWithProvider("Twitter")}
              >
                <TwitterIcon className={classes.icon} />
                SIGN IN WITH TWITTER
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
    textShadow: "1px 1px 1px rgba(0,0,0,0.4)"
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
    }
  },
  label: {
    "&$cssFocused": {
      color: "#FFF",
      fontWeight: "bold",
      textShadow: "1px 1px 1px rgba(0,0,0,0.4)"
    },
    color: "#FFF",
    textShadow: "1px 1px 1px rgba(0,0,0,0.4)"
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
  twitterButton: {
    marginTop: 10,
    width: 240,
    background: "#55acee",
    color: "#FFF",
    "&:hover": {
      background: "#3197E5"
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
