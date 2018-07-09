import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Avatar from "@material-ui/core/Avatar";

class ModuleHeader extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  render() {
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
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5,
    color: "#303030"
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
  uploadedImage: {
    width: "100%",
    height: "100%"
  }
});
export default withStyles(styles)(ModuleHeader);
