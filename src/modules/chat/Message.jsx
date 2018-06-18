import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import ReactMarkdown from "react-markdown";
import "./Message.css"; // this is here to override markdown css

class Message extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    formattedTimeStamp: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired
  };

  state = {
    anchorEl: null,
    hovered: false
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

  render() {
    const { classes, type, userID, message } = this.props;
    const { anchorEl, hovered } = this.state;
    return (
      <div
        className={classes.messageContainer}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
      >
        {type === "file" && this.renderFileMessage()}
        {type === "small" && this.renderSmallMessage()}
        {type === "normal" && this.renderNormalMessage()}
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
          <MenuItem> Edit Message </MenuItem>
          <MenuItem> Delete Message </MenuItem>
        </Popover>
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
  }
});
export default withStyles(styles)(Message);
