import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "actions";
import { withStyles } from "@material-ui/core/styles";
import LudereInput from "common/LudereInput";

class ResetPassword extends Component {
  state = {
    newPassword: "",
    confirmationNewPassword: "",
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { newPassword, confirmationNewPassword } = this.state;

    return (
      <div>
        <LudereInput
          label="New password"
          value={newPassword}
          handleChange={this.handleChange("newPassword")}
          // helperText="We will send an email with instruction on resetting your password. Please check both your inbox and spam folder."
        />
        <LudereInput
          label="Confirm new password"
          value={confirmationNewPassword}
          handleChange={this.handleChange("confirmationNewPassword")}
          // helperText="We will send an email with instruction on resetting your password. Please check both your inbox and spam folder."
        />
      </div>
    );
  }
}

const styles = {
  root: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    flexDirection: "column",
    overflowY: "auto",
  },
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResetPassword));
