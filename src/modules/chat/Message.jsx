import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Dialog from "common/Dialog";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import "./Message.css"; // this is here to override markdown css
import FileMessage from "./MessageComponents/FileMessage";

class Message extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    formattedTimeStamp: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    messageID: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  };

  state = {
    editableText: this.props.message.messageText,
    anchorEl: null,
    hovered: false,
    isEditing: false,
    showDeleteDialog: false,
  };

  componentDidMount() {
    const { messageID } = this.props;

    // this gets all element nodes of a message component. Finds the "code" blocks. And then highlights them.
    const elementNodes = document
      .getElementById(messageID)
      .querySelectorAll("code");
    elementNodes.forEach(block => {
      window.hljs.highlightBlock(block);
    });
  }

  componentDidUpdate() {
    const { messageID } = this.props;

    // this gets all element nodes of a message component. Finds the "code" blocks. And then highlights them.
    const elementNodes = document
      .getElementById(messageID)
      .querySelectorAll("code");
    elementNodes.forEach(block => {
      window.hljs.highlightBlock(block);
    });
  }

  renderNormalMessage = () => {
    const {
      classes,
      message,
      formattedTimeStamp,
      userName,
      avatarURL,
    } = this.props;

    return (
      <React.Fragment>
        <Avatar src={avatarURL} style={{ margin: "0px 10px" }} />
        <div className={classes.messageContent}>
          <div className={classes.messageHeader}>
            <div className={classes.name}>{userName}</div>
            <div className={classes.date}> {formattedTimeStamp} </div>
          </div>
          <ReactMarkdown source={message.messageText} />
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
    const {
      classes,
      type,
      userID,
      message,
      formattedTimeStamp,
      avatarURL,
      userName,
    } = this.props;
    const { anchorEl, hovered, showDeleteDialog } = this.state;

    return (
      <React.Fragment>
        {type === "file" && (
          <FileMessage
            message={message}
            formattedTimeStamp={formattedTimeStamp}
            avatarURL={avatarURL}
            userName={userName}
          />
        )}
        {type === "small" && this.renderSmallMessage()}
        {type === "normal" && this.renderNormalMessage()}
        {message.edited && <div className={classes.date}> (Edited) </div>}
        {message.sentBy === userID ? (
          <MoreVertIcon
            className={hovered ? classes.icon : classes.hiddenIcon}
            aria-owns={anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
            onClick={ev => this.handleMenuClick(ev)}
          />
        ) : (
          <MoreVertIcon className={classes.hiddenIcon} />
        )}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem
            onClick={() => this.handleBeginEditing()}
            disabled={message.type === "file"}
          >
            <ListItemIcon className={classes.icon}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Message" />
          </MenuItem>
          <MenuItem onClick={() => this.openDeleteDialog()}>
            <ListItemIcon className={classes.icon}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Message" />
          </MenuItem>
        </Popover>
        <Dialog
          handleAction={this.handleDeleteMessage}
          open={showDeleteDialog}
          handleClose={this.closeDeleteDialog}
          titleName="Delete Message"
          actionButtonName="Delete"
          color="#E57373"
          helperText="Are you sure you want to delete this message?"
        >
          <Paper className={classes.paperMessage} elevation={4}>
            {this.renderNormalMessage()}
          </Paper>
        </Dialog>
      </React.Fragment>
    );
  };

  handleUpdateMessage = () => {
    const { actions, messageID, channelID } = this.props;
    const { editableText } = this.state;

    const updatedMessage = { messageText: editableText, edited: true };

    actions.updateMessage(messageID, updatedMessage, channelID);
    this.setState({ isEditing: false });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      editableText: this.props.message.messageText,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderEditingMessage = () => {
    const { classes } = this.props;
    const { editableText } = this.state;

    return (
      <div className={classes.editContainer}>
        <Input
          className={classes.input}
          classes={{ focused: classes.inputFocused }}
          value={editableText}
          onChange={this.handleChange("editableText")}
          multiline
          rowsMax="16"
          disableUnderline
          autoFocus
          onKeyPress={ev => {
            if (ev.key === "Enter" && !ev.shiftKey) {
              this.handleUpdateMessage();
              ev.preventDefault();
            }
          }}
        />
        <div className={classes.editButtons}>
          <Button
            size="small"
            style={{ margin: 4, color: "#B9BBBE" }}
            onClick={this.handleCancelEdit}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{
              color: "white",
              margin: 4,
              backgroundColor: "#00BCD4",
            }}
            onClick={this.handleUpdateMessage}
          >
            Save Changes
          </Button>
        </div>
      </div>
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
    const { actions, messageID, channelID } = this.props;
    actions.deleteMessage(messageID, channelID);
    this.handleClose();
    this.setState({ showDeleteDialog: false });
  };

  openDeleteDialog = () => {
    this.setState({ showDeleteDialog: true });
    this.handleClose(); // closes message context menu
  };

  closeDeleteDialog = () => {
    this.setState({ showDeleteDialog: false });
  };

  render() {
    const { classes, messageID } = this.props;
    const { isEditing } = this.state;

    return (
      <div
        className={classes.messageContainer}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        id={messageID}
      >
        {isEditing ? this.renderEditingMessage() : this.renderMessage()}
      </div>
    );
  }
}

const styles = theme => ({
  messageContainer: {
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: "row",
    display: "flex",
    backgroundColor: "transparent",
    alignItems: "center",
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: "#EEEEEE",
    },
  },
  messageContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    // marginRight: 30,
    marginTop: "0px",
    fontSize: "15px",
  },
  messageBlockContent: {
    flex: 1,
    marginLeft: 60,
    display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    marginTop: "0px",
    fontSize: "15px",
  },
  messageHeader: {
    display: "flex",
    flexDirection: "row",
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
  },
  date: {
    fontSize: 12,
    alignItems: "center",
    display: "flex",
    marginLeft: 3,
    color: "#b9bbbe",
  },
  icon: {
    color: "#6f6f6f",
    "&:hover": {
      color: "#303030",
      cursor: "pointer",
    },
  },
  hiddenIcon: {
    opacity: "0",
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
      border: "#B0B2B6 2px solid",
    },
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
      border: "2px solid #00bcd4",
    },
  },
  editContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  editButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  paperMessage: {
    padding: 12,
    display: "flex",
    marginBottom: 32,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Message));
