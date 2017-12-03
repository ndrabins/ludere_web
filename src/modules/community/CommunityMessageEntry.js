import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import TextField from "material-ui/TextField";
import AddIcon from "material-ui-icons/Add";

class CommunityMessageEntry extends Component {
  state = {
    messageText: ""
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  sendMessage = () => {
    if(this.state.messageText === '' || !this.props.selectedChannel){
      return;
    }
    // this.props.actions.sendMessage(this.state.messageText);

    this.setState({
      messageText:'',
    });
  }

  render() {
    let name = 'Community Chat';
    // if(this.props.selectedChannel){
    //   name = this.props.channels[this.props.selectedChannel].name;
    // }

    return (
      <div style={styles.container}>
        <div style={styles.messageInputContainer}>
          <div style={styles.fileInput}>
            <AddIcon />
          </div>
          <div style={styles.textFieldContainer}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              placeholder={`Message #${name}`}
              fullWidth
              value={this.state.messageText}
              onChange={this.handleChange("messageText")}
              InputProps={{
                disableUnderline: true,
              }}
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.sendMessage();
                  ev.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  messageInputContainer: {
    width: "100%",
    border: "2px solid black",
    borderRadius: 8,
    padding: 5,
    display:'flex',
  },
  fileInput: {
    color: "#767778",
    width: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRight: "solid 2px #767778"
  },
  textFieldContainer:{
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    display:'flex'
  }
};

function mapStateToProps(state) {
  return {
    // selectedChannel: state.chat.selectedChannel,
    // channels: state.chat.channels
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityMessageEntry);
