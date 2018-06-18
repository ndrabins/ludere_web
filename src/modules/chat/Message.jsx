import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import ReactMarkdown from "react-markdown";
import "./Message.css"; // this is here to override markdown css

class Message extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    formattedTimeStamp: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    messageID: PropTypes.string.isRequired
  };

  state = {
    editableText: this.props.message.messageText,
    anchorEl: null,
    hovered: false,
    isEditing: false,
    showDeleteDialog: false
  };

  renderNormalMessage = () => {
    const { classes, message, formattedTimeStamp } = this.props;

    return (
      <React.Fragment>
        <Avatar src={message.avatarURL} style={{ margin: "0px 10px" }} />
        <div className={classes.messageContent}>
          <div className={classes.messageHeader}>
            <div className={classes.name}>{message.sentByDisplayName}</div>
            <div className={classes.date}> {formattedTimeStamp} </div>
          </div>
          <ReactMarkdown source={message.messageText} />
        </div>
      </React.Fragment>
    );
  };
  renderFileMessage = () => {
    const { classes, message, formattedTimeStamp } = this.props;

    return (
      <React.Fragment>
        <Avatar src={message.avatarURL} style={{ margin: "0px 10px" }} />
        <div className={classes.messageContent}>
          <div className={classes.messageHeader}>
            <div className={classes.name}>{message.sentByDisplayName}</div>
            <div className={classes.date}> {formattedTimeStamp} </div>
          </div>
          <ReactMarkdown source={message.messageText} />
          <img
            src={message.fileURL}
            alt="file upload"
            className={classes.uploadedImage}
          />
        </div>
      </React.Fragment>
    );
  };
  renderSmallMessage = () => {
    const { classes, message } = this.props;
    return (
      <div className={classes.messageBlockContent}>
        <ReactMarkdown source={message.messageText} />
      </div>
    );
  };

  renderMessage = () => {
    const { classes, type, userID, message } = this.props;
    const { anchorEl, hovered } = this.state;

    return (
      <React.Fragment>
        {type === "file" && this.renderFileMessage()}
        {type === "small" && this.renderSmallMessage()}
        {type === "normal" && this.renderNormalMessage()}
        {message.edited && <div className={classes.date}> (Edited) </div>}
        {message.sentBy === userID && (
          <MoreVertIcon
            className={hovered ? classes.icon : classes.hiddenIcon}
            aria-owns={anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
            onClick={ev => this.handleMenuClick(ev)}
          />
        )}
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
          <MenuItem onClick={() => this.handleBeginEditing()}>
            Edit Message
          </MenuItem>
          <MenuItem onClick={() => this.handleDeleteMessage()}>
            Delete Message
          </MenuItem>
        </Popover>
      </React.Fragment>
    );
  };

  handleUpdateMessage = () => {
    const { actions, messageID } = this.props;
    const { editableText } = this.state;

    const updatedMessage = { messageText: editableText, edited: true };

    actions.updateMessage(messageID, updatedMessage);
    this.setState({ isEditing: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  renderEditingMessage = () => {
    const { classes } = this.props;
    const { editableText } = this.state;

    return (
      <Input
        className={classes.input}
        classes={{ focused: classes.inputFocused }}
        value={editableText}
        onChange={this.handleChange("editableText")}
        multiline
        fullWidth
        rowsMax="16"
        disableUnderline
        autoFocus
        onBlur={() => this.handleUpdateMessage()}
        onKeyPress={ev => {
          if (ev.key === "Enter" && !ev.shiftKey) {
            this.handleUpdateMessage();
            ev.preventDefault();
          }
        }}
      />
    );
  };

  handleMenuClick = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMouseOver = () => {
    this.setState({ hovered: true });
  };
  handleMouseLeave = () => {
    this.setState({ hovered: false });
  };

  handleBeginEditing = () => {
    this.setState({ isEditing: true });
    this.handleClose();
  };

  handleDeleteMessage = () => {
    const { actions, messageID } = this.props;
    // actions.deleteMessage(messageID);
    this.setState({ showDeleteDialog: true });
    this.handleClose();
  };

  closeDeleteDialog = () => {
    this.setState({ showDeleteDialog: false });
  };

  render() {
    const { classes } = this.props;
    const { isEditing } = this.state;

    return (
      <div
        className={classes.messageContainer}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
      >
        {isEditing ? this.renderEditingMessage() : this.renderMessage()}
      </div>
    );
  }
}

const styles = theme => ({
  messageContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: "row",
    display: "flex",
    backgroundColor: "transparent",
    alignItems: "center",
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: "#EEEEEE"
    }
  },
  messageContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    wordBreak: "break-all",
    overflowWrap: "break-word",
    marginRight: 30,
    marginTop: "0px",
    fontSize: "15px"
  },
  messageBlockContent: {
    flex: 1,
    marginLeft: 60,
    display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    wordBreak: "break-all",
    overflowWrap: "break-word",
    marginTop: "0px",
    fontSize: "15px"
  },
  messageHeader: {
    display: "flex",
    flexDirection: "row"
  },
  name: {
    fontSize: 16,
    fontWeight: 500
  },
  date: {
    fontSize: 12,
    alignItems: "center",
    display: "flex",
    marginLeft: 3,
    color: "#b9bbbe"
  },
  icon: {
    color: "#6f6f6f",
    "&:hover": {
      color: "#303030",
      cursor: "pointer"
    }
  },
  hiddenIcon: {
    opacity: "0"
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    border: "transparent 2px solid",
    marginLeft: 60,
    transition: "border .25s ease-out",
    "&:hover": {
      border: "#B0B2B6 2px solid"
    }
  },
  inputFocused: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    marginLeft: 60,
    transition: "border .25s ease-out",
    border: "2px solid #00bcd4",
    "&:hover": {
      border: "2px solid #00bcd4"
    }
  }
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Message));
