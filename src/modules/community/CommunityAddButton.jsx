import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

class CommunityAddButton extends Component {
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
        <IconButton style={styles.createChannelButton}>
          <AddIcon style={{ fontSize: 16 }} />
        </IconButton>
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

export default connect(null, mapDispatchToProps)(CommunityAddButton);
