import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import TextField from "material-ui/TextField";

class MessageEntry extends Component {
  state = {
    messageText: ""
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.messageInputContainer}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Message #"
            fullWidth
            value={this.state.messageText}
            onChange={this.handleChange("messageText")}
            disableUnderline
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  messageInputContainer: {
    width: '100%',
    border: '2px solid black',
    borderRadius: 8,
    padding: 5
  }
};

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
    channels : state.chat.channels
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageEntry);
