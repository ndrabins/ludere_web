import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

class Message extends Component {
  render() {
    const { text, timestamp, classes, displayName, photoURL } = this.props;
    console.log(timestamp);
    let diff = moment(timestamp).diff(moment(), "minutes");
    let formattedTimeStamp = moment()
      .add(diff, "minutes")
      .calendar();

    return (
      <div className={classes.messageContainer}>
        <Avatar src={photoURL} />
        <div className={classes.messageContent}>
          <div className={classes.messageHeader}>
            <Typography className={classes.name}> {displayName} </Typography>
            <Typography className={classes.date}>
              {formattedTimeStamp}
            </Typography>
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
    display: "flex"
  },
  messageContent: {
    maxWidth: "90%",
    marginRight: 10,
    marginLeft: 5,
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
    fontWeight: "500"
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
