import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "common/Dialog";
import LudereInput from "common/LudereInput";

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
          <LudereInput
            label="Channel Name"
            value={channelName}
            handleChange={this.handleChange("channelName")}
            helperText="Use names that help you specify what you are doing such as #design or #development"
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleCreateChannel();
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
    width: 24,
    height: 24,
    padding: 0,
    color: "white",
    background: "linear-gradient(to right, #e57373, #ee8d68)"
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CreateChatButton);
