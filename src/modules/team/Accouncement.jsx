import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import ReadOnlyQuill from "common/ReadOnlyQuill";

class Announcement extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { data } = this.props;
  }

  render() {
    const { classes, data, editorID, user } = this.props;

    let diff = moment(data.dateCreated).diff(moment(), "minutes");
    let timestamp = moment()
      .add(diff, "minutes")
      .calendar();

    let editorName = "editor" + editorID;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.user}>
            <Avatar src={user.photoURL} style={{ margin: "0px 10px" }} />
            <div className={classes.name}>{user.displayName}</div>
          </div>
          <Typography variant="caption" className={classes.timestamp}>
            {timestamp}
          </Typography>
        </div>
        <ReadOnlyQuill value={data.content} editorName={editorName} />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    padding: 8,
    margin: 8,
    boxShadow: "0 4px 4px 0 rgba(0,0,0,0.12), 0 0 8px 0 rgba(0,0,0,0.24)",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    wordWrap: "break-word",
    wordBreak: "break-all",
    overflowWrap: "break-word"
  },
  timestamp: {
    display: "flex",
    justifyContent: "flex-end"
  }
});
export default withStyles(styles)(Announcement);
