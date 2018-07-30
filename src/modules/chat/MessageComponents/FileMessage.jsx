import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FileIcon from "@material-ui/icons/InsertDriveFileOutlined";
import DownloadIcon from "@material-ui/icons/CloudDownloadTwoTone";
import { Typography } from "../../../../node_modules/@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";

const IMAGEFILE_REGEX = /\.(gif|jpg|jpeg|tiff|png|mp4)$/i;

class FileMessage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  state = {
    expandImage: false
  };

  handleClose = () => {
    this.setState({ expandImage: false });
  };

  handleExpandImage = () => {
    this.setState({ expandImage: true });
  };

  downloadFile = url => {
    const { message } = this.props;

    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function(event) {
      var blob = xhr.response;
      var windowURL = window.URL;
      var fileUrl = windowURL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.href = fileUrl;
      anchor.target = "_blank";
      anchor.download = message.messageText;
      anchor.style = "display: none";

      document.body.appendChild(anchor);
      anchor.click();
      windowURL.revokeObjectURL(fileUrl);
    };
    xhr.open("GET", url);
    xhr.send();
  };

  imageFile = () => {
    const { classes, message } = this.props;
    const { expandImage } = this.state;

    return (
      <React.Fragment>
        <img
          src={message.fileURL}
          alt="message file"
          className={classes.uploadedImage}
          onClick={this.handleExpandImage}
        />
        <Dialog
          open={expandImage}
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
        >
          <div className={classes.imageWrapper}>
            <img
              src={message.fileURL}
              alt="message file"
              className={classes.expandedImage}
            />
            <Tooltip title="Download File">
              <IconButton
                onClick={() => this.downloadFile(message.fileURL)}
                className={classes.floatingIconButton}
              >
                <DownloadIcon className={classes.floatingDownloadIcon} />
              </IconButton>
            </Tooltip>
          </div>
        </Dialog>
      </React.Fragment>
    );
  };

  regularFile = () => {
    const { classes, message } = this.props;

    return (
      <div className={classes.fileContainer}>
        <div className={classes.fileHeader}>
          <FileIcon className={classes.fileIcon} />
          <Typography
            className={classes.fileText}
            onClick={() => this.downloadFile(message.fileURL)}
          >
            {message.messageText}
          </Typography>
        </div>
        <Tooltip title="Download File">
          <IconButton onClick={() => this.downloadFile(message.fileURL)}>
            <DownloadIcon className={classes.downloadIcon} />
          </IconButton>
        </Tooltip>
      </div>
    );
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
          {/* <ReactMarkdown source={message.messageText} /> */}
          {message.messageText.match(IMAGEFILE_REGEX)
            ? this.imageFile()
            : this.regularFile()}
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
    width: "100%",
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
    maxWidth: "300px",
    maxHeight: "300px",
    cursor: "pointer",
    borderRadius: 8,
    width: "100%",
    height: "auto"
  },
  imageWrapper: {
    position: "relative"
  },
  expandedImage: {
    height: "100%",
    width: "100%",
    // maxWidth: "80%",
    // maxHeight: "80%",
    cursor: "pointer"
  },
  fileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#FFF",
    justifyContent: "space-between",
    padding: 4,
    borderRadius: 4,
    border: "1px solid rgba(0,0,0,.24)",
    borderLeft: "5px solid rgba(0,0,0,.24);"
  },
  fileHeader: {
    display: "flex",
    flexDirection: "row"
  },
  fileIcon: {
    fontSize: 46
  },
  floatingIconButton: {
    position: "absolute",
    width: 50,
    height: 50,
    right: 20,
    bottom: 20
  },
  floatingDownloadIcon: {
    fontSize: 40,
    color: "white"
  },
  downloadIcon: {
    fontSize: 30
  },
  fileText: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    textDecorationColor: "black",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "black"
    }
  }
});
export default withStyles(styles)(FileMessage);
