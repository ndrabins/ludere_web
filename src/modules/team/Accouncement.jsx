import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
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
    const { classes, data, editorID } = this.props;

    let diff = moment(data.dateCreated).diff(moment(), "minutes");
    let timestamp = moment()
      .add(diff, "minutes")
      .calendar();

    let editorName = "editor" + editorID;
    console.log(editorName);
    return (
      <div className={classes.root}>
        <Typography variant="caption" className={classes.timestamp}>
          {timestamp}
        </Typography>
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
  timestamp: {
    display: "flex",
    justifyContent: "flex-end"
  }
});
export default withStyles(styles)(Announcement);
