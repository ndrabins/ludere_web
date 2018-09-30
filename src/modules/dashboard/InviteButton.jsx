import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "common/Dialog";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Chip from "@material-ui/core/Chip";

import LudereInput from "common/LudereInput";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class InviteButton extends Component {
  state = {
    open: false,
    copied: false,
    email: "",
    emailList: [],
    emailError: ""
  };

  handleClose = () => {
    this.setState({
      open: false,
      copied: false,
      emailError: "",
      emailList: [],
      email: ""
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleAddEmailAddress = () => {
    const { emailList, email } = this.state;
    let newEmailList = [...emailList];
    if (email.match(EMAIL_REGEX)) {
      newEmailList.push(email);
      this.setState({ email: "", emailList: newEmailList, emailError: "" });
    } else {
      this.setState({ emailError: "Not a valid email" });
    }
  };

  handleDelete = index => {
    const { emailList } = this.state;
    let newEmailList = [...emailList];
    newEmailList.splice(index, 1);

    this.setState({ emailList: newEmailList });
  };

  sendInvites = () => {
    const { emailList } = this.state;
    const { actions } = this.props;
    console.log(emailList);
    actions.inviteUsers(emailList);

    this.handleClose();
  };

  render() {
    const { classes, selectedWorkspace } = this.props;
    const { open, copied, email, emailList } = this.state;

    // const localURL = window.location.href.split("/"); //get just base URL
    // const url = `https://${localURL[2]}/auth/${selectedWorkspace}`;

    return (
      <div className={classes.container}>
        <IconButton
          onClick={this.handleClickOpen}
          className={classes.inviteButton}
        >
          <PersonAdd className={classes.personAdd} />
        </IconButton>

        <Dialog
          handleAction={this.sendInvites}
          open={open}
          handleClose={this.handleClose}
          titleName="Invite team members"
          actionButtonName="Send Invites"
          color="linear-gradient(to right, #29b6f6, #796eff)"
          helperText=""
          showActionButtons={true}
        >
          <div>
            <LudereInput
              label="Team member email address"
              value={email}
              handleChange={this.handleChange("email")}
              helperText="Enter the email of the user you want to invite!"
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.handleAddEmailAddress();
                  ev.preventDefault();
                }
              }}
            />
            <Button
              onClick={this.handleAddEmailAddress}
              className={classes.addButton}
              variant="outlined"
            >
              Add user
            </Button>
          </div>
          <div className={classes.inviteContainer}>
            {emailList.map((email, index) => {
              return (
                <Chip
                  key={index}
                  label={email}
                  onDelete={() => this.handleDelete(index)}
                  className={classes.chip}
                />
              );
            })}
          </div>

          {/* <TextField
            id="url"
            label="Invite URL"
            className={classes.textField}
            value={url}
            margin="normal"
            fullWidth
          />
          <CopyToClipboard
            text={url}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button variant="raised" className={classes.copyButton}>
              {copied ? "COPIED" : "COPY"}
            </Button>
          </CopyToClipboard> */}
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  personAdd: {
    color: "white",
    fontSize: 16
  },
  inviteButton: {
    padding: 0,
    width: 24,
    height: 24,
    background: "linear-gradient(to right, #29b6f6, #796eff)"
  },
  textField: {
    marginRight: theme.spacing.unit
  },
  inviteContainer: {
    marginTop: 10
  },
  chip: {
    margin: 4
  },
  addButton: {
    marginLeft: 8
  },
  copyButton: {
    color: "rgba(255,255,255,.8)",
    background: "linear-gradient(to right, #29b6f6, #796eff)"
  }
});

function mapStateToProps(state) {
  return {
    selectedWorkspace: state.workspace.selectedWorkspace,
    workspaces: state.workspace.workspaces
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
)(withStyles(styles)(InviteButton));
