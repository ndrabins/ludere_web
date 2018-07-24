import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FileIcon from "@material-ui/icons/InsertDriveFileOutlined";
import DownloadIcon from "@material-ui/icons/CloudDownloadTwoTone";
import { Typography } from "../../../../node_modules/@material-ui/core";

const IMAGEFILE_REGEX = /\.(gif|jpg|jpeg|tiff|png)$/i;

class FileMessage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  downloadFile = url => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function(event) {
      var blob = xhr.response;
      console.log("blob?", blob);

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return (blob, fileName) => {
        console.log("something?");
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        // window.URL.revokeObjectURL(url);
      };
    };
    xhr.open("GET", url);
    xhr.send();
  };

  imageFile = () => {
    const { classes, message } = this.props;

    return (
      <img
        src={message.fileURL}
        alt="file upload"
        className={classes.uploadedImage}
      />
    );
  };

  regularFile = () => {
    const { classes, message } = this.props;

    return (
      <div className={classes.fileContainer}>
        <div className={classes.fileHeader}>
          <FileIcon className={classes.fileIcon} />
          <a href={message.fileURL} download className={classes.fileText}>
            <Typography className={classes.fileText}>
              {message.messageText}
            </Typography>
          </a>
        </div>
        <IconButton onClick={() => this.downloadFile(message.fileURL)}>
          <DownloadIcon className={classes.downloadIcon} />
        </IconButton>
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
