import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "actions";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

class ResetPassword extends Component {
  state = {
    openSnackbar: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleResetPassword = () => {
    const { actions } = this.props;
    this.setState({ openSnackbar: true });
    actions.resetPassword();
  };

  handleClose = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    const { openSnackbar } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="outlined"
          color="default"
          className={classes.button}
          onClick={this.handleResetPassword}
        >
          Reset Password
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">Reset Password Email Sent</span>}
        />
      </div>
    );
  }
}

const styles = {
  root: {
    marginBottom: 24,
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
