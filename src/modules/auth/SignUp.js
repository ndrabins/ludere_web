import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

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

  renderSignUp(){
    if(this.props.loginTransition !== "SignUp"){
      return(
        <p style={styles.headerClosed}>GET STARTED</p>
      );
    }

    return(
      <div style={{display:'flex', flexDirection:"column"}}>
        <p style={styles.header}>Get Started</p>
        <FormControl style={styles.formControl}>
          <InputLabel style={styles.inputLabel} htmlFor="emails">Email</InputLabel>
          <Input
            id="email"
            style={styles.inputText}
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
        </FormControl>
        <FormControl style={styles.formControl}>
          <InputLabel style={styles.inputLabel} htmlFor="password">New Password</InputLabel>
          <Input
            id="password"
            style={styles.inputText}
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
        </FormControl>
        <FormControl style={styles.formControl}>
          <InputLabel style={styles.inputLabel} htmlFor="confirm_password">Confirm Password</InputLabel>
          <Input
            id="confirm_password"
            style={styles.inputText}
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.confirm_password}
            onChange={this.handleChange("confirm_password")}
          />
        </FormControl>
        <div style={styles.button}>
          <Button raised color="primary" onClick={() => this.props.actions.signUpUser(this.state.email, this.state.password)}>
            Sign Up
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={this.props.loginTransition==="SignUp" ? styles.moduleSignUpOpen : styles.moduleSignUpClosed} onClick={this.props.focusSignUp}>
        {this.renderSignUp()}
      </div>
    );
  }
}

const styles = {
  moduleSignUpOpen: {
    width: "350px",
    minHeight: "300px",

    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    overflow: "auto",

    alignSelf: "center",

    padding: "50px 100px",
    backgroundColor: 'rgba(48, 48, 48, 0.5)',
    borderRadius: "6px 0px 0px 6px",
    color: "#FFFFFF",

    position: "relative",
    transition: "width 0.75s ease",
  },
  moduleSignUpClosed: {
    width: "150px",
    minHeight: "300px",

    display: "flex",
    flexDirection: "column",

    alignSelf: "center",
    justifyContent: "center",

    padding: "50px",
    backgroundColor: 'rgba(48, 48, 48, 0.5)',
    borderRadius: "6px 0px 0px 6px",

    position: "relative",
    transition: "width 0.75s ease",
  },
  headerClosed: {
    color: "#FFFFFF",
    fontSize: "22px",
    alignSelf: "center",
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
  inputText: {
    color: "#FFFFFF",
  },
  button: {
    display: "flex",
    flexDirection:"column",
    paddingTop: "20px",
    alignSelf: "stretch",
  },
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
