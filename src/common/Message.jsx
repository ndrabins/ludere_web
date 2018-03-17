import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import FolderIcon from "material-ui-icons/Folder";
import moment from "moment";


class Message extends Component {
  render() {
    const { text, timestamp, sentBy, classes, displayName } = this.props;
    let diff = moment(timestamp).diff(moment(), "minutes");
    let formattedTimesstamp = moment().add(diff, "minutes").calendar();

    return(
      <div className={classes.messageContainer}>
        <Avatar>
          <FolderIcon />
        </Avatar>
        <div className={classes.messageContent}>
          <div className={classes.messageHeader}>
            <Typography className={classes.name}> {displayName} </Typography>
            <Typography className={classes.date}> {formattedTimesstamp} </Typography>
          </div>
          <Typography className={classes.messageText}>{text}</Typography>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  messageContainer: {
    marginRight: 10,
    flexDirection: "row",
    display: "flex",
  },
  messageContent: {
    maxWidth: "90%",
    marginTop: 10,
    marginRight: 30,
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
    fontWeight: "bold"
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
