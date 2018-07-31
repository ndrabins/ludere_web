import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/apple.json";
import Popover from "@material-ui/core/Popover";
import GiphyModal from "./GiphyModal";
import GifIcon from "@material-ui/icons/Gif";

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
      anchorEl: null,
      openGiphy: false
    };
    // debounce the passed in dispatch method, so not to update the typing indicator every keypress
    this.updateChannel = Debounce(this.props.actions.updateChannel, 1000);
  }

  static defaultProps = {
    actionOnSendMessage: () => {}
  };

  handleChange = prop => event => {
    let updatedChannel = { usersTyping: {} };
    const { channelID, user } = this.props;
    if (event.target.value !== "") {
      //update typing object with current user typing
      if (updatedChannel.usersTyping[user.uid] !== undefined) {
        updatedChannel.usersTyping[user.uid] = true;
        this.updateChannel(updatedChannel, channelID);
      }
    } else {
      updatedChannel.usersTyping[user.uid] = false;
      this.updateChannel(updatedChannel, channelID);
    }

    //If event.target.value == "" set user typing false
    this.setState({ [prop]: event.target.value });
  };

  sendMessage = () => {
    const { user, channelID } = this.props;

    if (this.state.messageText === "" || !this.props.channelID) {
      return;
    }

    //Update that user is no longer typing
    this.props.actions.sendMessage({
      messageText: this.state.messageText,
      channelID
    });
    let updatedChannel = { usersTyping: {} };
    updatedChannel.usersTyping[user.uid] = false;
    this.updateChannel(updatedChannel, channelID);
    this.props.actionOnSendMessage();

    this.setState({
      messageText: ""
    });
  };

  uploadFile = ev => {
    ev.preventDefault();

    const { channelID, actions } = this.props;

    const file = this.uploadInput.files[0];
    const chatUploadRef = firebase
      .storage()
      .ref(`chat/${channelID}/${file.name}`);

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
            fileURL: downloadURL,
            channelID
          });
          this.props.actionOnSendMessage();
        });
      }
    );
  };

  handleSendGif = (gifURL, gifName) => {
    const { channelID } = this.props;

    this.props.actions.sendMessage({
      messageText: gifName,
      type: "file",
      fileURL: gifURL,
      channelID
    });
    this.props.actionOnSendMessage();
  };

  openGifPicker = () => {
    this.setState({ openGiphy: true });
  };

  handleClickAwayGiphy = () => {
    this.setState({ openGiphy: false });
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
    const { helperText, classes, small, autoFocus } = this.props;
    const { anchorEl, openGiphy } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.fileInput}>
          <input
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
          autoFocus={autoFocus}
          id="name"
          placeholder={helperText}
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
        <GiphyModal
          open={openGiphy}
          handleClickAwayGiphy={this.handleClickAwayGiphy}
          handleSendGif={this.handleSendGif}
          small={small}
        />
        <GifIcon onClick={this.openGifPicker} className={classes.gifIcon} />

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
    paddingRight: 66,
    width: "calc(100% - 76px)",
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
    right: 26,
    color: "#b9bbbe",
    transition: "color 0.25s ease-out",
    "&:hover": {
      color: "#303030"
    }
  },
  gifIcon: {
    position: "absolute",
    width: 36,
    height: 42,
    cursor: "pointer",
    top: 0,
    fontSize: 46,
    right: 52,
    color: "#b9bbbe",
    transition: "color 0.25s ease-out",
    "&:hover": {
      color: "#303030"
    }
  }
});

function mapStateToProps(state) {
  return {
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
