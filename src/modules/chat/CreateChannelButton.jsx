import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "common/Dialog";
import TextField from "@material-ui/core/TextField";

class CreateChatButton extends Component {
  state = {
    open: false,
    channelName: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, channelName: "" });
  };

  handleCreateChannel = () => {
    this.handleClose();
    this.props.actions.createChannel(this.state.channelName);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { open, channelName } = this.state;
    return (
      <div>
        <IconButton
          style={styles.createChannelButton}
          onClick={this.handleClickOpen}
        >
          <AddIcon style={{ fontSize: 16 }} />
        </IconButton>
        <Dialog
          handleAction={this.handleCreateChannel}
          open={open}
          handleClose={this.handleClose}
          titleName="Create Chat Channel"
          actionButtonName="Create"
          color="linear-gradient(to right, rgb(229, 115, 115), rgb(238, 141, 104))"
          helperText="Create a channel to chat with teammates!"
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Workflow Name"
            fullWidth
            autoComplete="off"
            value={channelName}
            onChange={this.handleChange("channelName")}
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleCreateBoard();
                ev.preventDefault();
              }
            }}
          />
        </Dialog>
      </div>
    );
  }
}

const styles = {
  createChannelButton: {
    width: 22,
    height: 22,
    color: "white",
    background: "linear-gradient(to right, #e57373, #ee8d68)"
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CreateChatButton);
