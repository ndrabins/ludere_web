import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import FileIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Fade from "@material-ui/core/Fade";

class FileUploaderProgress extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fileUploadPercent: PropTypes.number.isRequired,
    fileUploadInProgress: PropTypes.bool.isRequired,
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired
  };

  formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
      d = b || 2,
      e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
  }

  render() {
    const {
      classes,
      fileUploadPercent,
      fileUploadInProgress,
      fileName,
      fileSize
    } = this.props;

    // if (!fileUploadInProgress) {
    //   return null;
    // }

    return (
      <Fade in={fileUploadInProgress} timeout={{ enter: 200, exit: 200 }}>
        <Paper
          className={classes.root}
          style={{ zIndex: fileUploadInProgress ? 0 : -10 }}
        >
          <div className={classes.textContainer}>
            <Typography variant="title" style={{ color: "#303030" }}>
              {fileName} {" - "}
            </Typography>
            <Typography
              variant="subheading"
              style={{ color: "#b9bbbe", paddingLeft: 8 }}
            >
              {this.formatBytes(fileSize)}
            </Typography>
          </div>
          <div className={classes.progressContainer}>
            <FileIcon className={classes.fileIcon} />
            <LinearProgress
              variant="determinate"
              value={fileUploadPercent}
              className={classes.progress}
            />
          </div>
        </Paper>
      </Fade>
    );
  }
}

const styles = theme => ({
  root: {
    position: "absolute",
    display: "flex",
    width: "calc(100% - 36px)",
    flexDirection: "column",
    top: "-105px",
    margin: "0px 2px",
    height: 100,
    justifyContent: "center",
    overflowX: "hidden",
    padding: 16,
    transition: "z-index 0.2s ease-out"
  },
  fileIcon: {
    fontSize: 46
  },
  textContainer: {
    display: "flex",
    alignItems: "center"
  },
  progressContainer: {
    alignItems: "center",
    flexDirection: "row",
    display: "flex"
  },
  progress: {
    flexGrow: 1
  }
});
export default withStyles(styles)(FileUploaderProgress);
