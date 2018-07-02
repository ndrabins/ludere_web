import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Map from "lodash/map";
import Announcement from "./Accouncement";

class AnnouncementList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    announcements: PropTypes.object.isRequired
  };

  render() {
    const { classes, announcements, loading } = this.props;
    let editorID = 0;

    if (loading) {
      return <div />;
    }

    return (
      <div className={classes.root}>
        {Map(announcements, (announcement, key) => {
          editorID = editorID + 1;
          return (
            <div key={key}>
              <Announcement
                data={announcement}
                editorID={editorID.toString()}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5,
    color: "#303030"
  }
});
export default withStyles(styles)(AnnouncementList);
