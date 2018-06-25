import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/apple.json";
import Popover from "@material-ui/core/Popover";

import { NimblePicker } from "emoji-mart";
import EmojiIcon from "react-icons/lib/fa/smile-o";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Debounce from "lodash/debounce";

class MessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: "",
      anchorEl: null
    };
    // debounce the passed in dispatch method, so not to update the typing indicator every keypress
    this.updateChannel = Debounce(this.props.actions.updateChannel, 1000);
  }

  handleChange = prop => event => {
    let updatedChannel = { usersTyping: {} };
    const { selectedChannel, user } = this.props;
    if (event.target.value !== "") {
      //update typing object with current user typing
      updatedChannel.usersTyping[user.uid] = true;
      this.updateChannel(updatedChannel, selectedChannel);
    } else {
      updatedChannel.usersTyping[user.uid] = false;
      this.updateChannel(updatedChannel, selectedChannel);
    }

    //If event.target.value == "" set user typing false
    this.setState({ [prop]: event.target.value });
  };

  sendMessage = () => {
    const { user, selectedChannel } = this.props;

    if (this.state.messageText === "" || !this.props.selectedChannel) {
      return;
    }

    //Update that user is no longer typing
    this.props.actions.sendMessage({ messageText: this.state.messageText });
    let updatedChannel = { usersTyping: {} };
    updatedChannel.usersTyping[user.uid] = false;
    this.updateChannel(updatedChannel, selectedChannel);

    this.setState({
      messageText: ""
    });
  };

  uploadFile = ev => {
    ev.preventDefault();

    const { selectedChannel, actions } = this.props;

    const file = this.uploadInput.files[0];
    const chatUploadRef = firebase
      .storage()
      .ref(`chat/${selectedChannel}/${file.name}`);

    const uploadTask = chatUploadRef.put(file);

    uploadTask.on(
      `state_changed`,
      snapshot => {
        // track progress here
      },
      error => {
        error("File couldn't be uploaded :(");
      },
      () => {
        //Success
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          actions.sendMessage({
            messageText: file.name,
            type: "file",
            fileURL: downloadURL
          });
        });
      }
    );
  };

  openEmojiPicker = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  addEmoji = (emoji, event) => {
    const { messageText } = this.state;
    this.setState({ messageText: messageText + emoji.native });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { selectedChannel, channel, classes } = this.props;
    const { anchorEl } = this.state;

    let name = "";

    if (selectedChannel && channel !== undefined) {
      name = channel.name;
    } else {
      return <div />;
    }

    return (
      <div className={classes.container}>
        <div className={classes.fileInput}>
          <input
            accept="image/*"
            className={classes.fileUploader}
            id="raised-button-file"
            multiple
            type="file"
            onChange={this.uploadFile}
            ref={ref => {
              this.uploadInput = ref;
            }}
          />
          <label className={classes.htmlLabel} htmlFor="raised-button-file">
            <AddIcon />
          </label>
        </div>
        <TextField
          autoFocus
          id="name"
          placeholder={`Message #${name}`}
          fullWidth
          rowsMax={12}
          multiline
          autoComplete="off"
          value={this.state.messageText}
          onChange={this.handleChange("messageText")}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textRoot,
              input: classes.textInput
            }
          }}
          onKeyPress={ev => {
            if (ev.key === "Enter" && !ev.shiftKey) {
              this.sendMessage();
              ev.preventDefault();
            }
          }}
        />
        <EmojiIcon
          className={classes.emojiIcon}
          onClick={this.openEmojiPicker}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <NimblePicker set="apple" data={data} onSelect={this.addEmoji} />
        </Popover>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    marginBottom: 5,
    paddingRight: 15,
    paddingLeft: 10,
    alignItems: "center",
    position: "relative"
  },
  fileInput: {
    color: "#767778",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 5,
    marginRight: 5,
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: "#c3c3c3"
    }
  },
  textRoot: {
    padding: 0,
    borderRadius: 4,
    marginBottom: 20
  },
  textInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #c3c3c3",
    fontSize: 16,
    padding: "10px 12px",
    width: "calc(100% - 24px)",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      borderColor: "#6d6d6d",
      boxShadow: "0 0 0 0.2rem rgba(109,109,109,.12)"
    },
    "&:focus": {
      borderColor: "#6d6d6d",
      boxShadow: "0 0 0 0.2rem rgba(109,109,109,.25)"
    }
  },
  fileUploader: {
    display: "none"
  },
  htmlLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  emojiIcon: {
    position: "absolute",
    width: 28,
    height: 28,
    cursor: "pointer",
    top: 7,
    right: 18,
    color: "#b9bbbe",
    transition: "color 0.25s ease-out",
    "&:hover": {
      color: "#303030"
    }
  }
});

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
    user: state.auth.user
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
)(withStyles(styles)(MessageEntry));
