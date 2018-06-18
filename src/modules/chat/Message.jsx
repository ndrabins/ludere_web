import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";

class Message extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  renderNormalMessage = () => {
    const { classes, message, formattedTimeStamp } = this.props;

    return (
      <div className={classes.messageContainer}>
        <Avatar src={message.avatarURL} style={{ margin: "0px 10px" }} />
        <div className={classes.messageContent}>
          <div className={classes.messageHeader}>
            <div className={classes.name}>{message.sentByDisplayName}</div>
            <div className={classes.date}> {formattedTimeStamp} </div>
          </div>
          <p className={classes.messageText}>{message.messageText}</p>
        </div>
      </div>
    );
  };

  renderFileMessage = () => {
    const { classes, message, formattedTimeStamp } = this.props;

    return (
      <div className={classes.messageContainer}>
        <Avatar src={message.avatarURL} style={{ margin: "0px 10px" }} />
        <div className={classes.messageContent}>
          <div className={classes.messageHeader}>
            <div className={classes.name}>{message.sentByDisplayName}</div>
            <div className={classes.date}> {formattedTimeStamp} </div>
          </div>
          <Typography variant="title" className={classes.messageText}>
            {message.messageText}
          </Typography>
          <img
            src={message.fileURL}
            alt="file upload"
            className={classes.uploadedImage}
          />
        </div>
      </div>
    );
  };
  renderSmallMessage = () => {
    const { classes, message } = this.props;
    return (
      <div className={classes.messageContainer}>
        <div className={classes.messageBlockContent}>
          <p className={classes.messageText}>{message.messageText}</p>
        </div>
      </div>
    );
  };

  render() {
    const { classes, type } = this.props;
    return (
      <div className={classes.root}>
        {type === "file" && this.renderFileMessage()}
        {type === "small" && this.renderSmallMessage()}
        {type === "normal" && this.renderNormalMessage()}
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
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: "#EEEEEE"
    }
  },
  messageContent: {
    maxWidth: "90%",
    marginRight: 30,
    display: "flex",
    flexDirection: "column"
  },
  messageBlockContent: {
    width: "90%",
    marginLeft: 60,
    display: "flex",
    flexDirection: "column"
  },
  messageHeader: {
    display: "flex",
    flexDirection: "row"
  },
  messageText: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    marginBottom: "3px",
    marginTop: "0px",
    fontSize: "15px"
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
  }
});
export default withStyles(styles)(Message);
