import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "material-ui/IconButton";
import AddIcon from "material-ui-icons/Add";

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

class CreateChatButton extends Component {
  state = {
    open: false,
    channelName: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false, channelName: "" });
  };

  handleCreateChannel = () => {
    this.handleRequestClose();
    this.props.actions.createChannel(this.state.channelName);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div>
        <IconButton
          style={styles.createChannelButton}
          onClick={this.handleClickOpen}
        >
          <AddIcon style={{ fontSize: 16 }} />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>Create Channel</DialogTitle>
          <DialogContent style={{ width: 300, maxWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Channel Name"
              fullWidth
              value={this.state.channelName}
              onChange={this.handleChange("channelName")}
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.handleCreateChannel();
                  ev.preventDefault();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="raised"
              onClick={this.handleCreateChannel}
              color="primary"
              style={{ color: "white" }}
            >
              Create Channel
            </Button>
          </DialogActions>
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