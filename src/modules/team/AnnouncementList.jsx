import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Map from "lodash/map";
import Announcement from "./Accouncement";
import AnnouncementsIcon from "static/undraw_announcements.svg";

class AnnouncementList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    announcements: PropTypes.object.isRequired,
    workspaceMembers: PropTypes.object.isRequired
  };

  render() {
    const { classes, announcements, loading, workspaceMembers } = this.props;
    let editorID = 0;

    if (loading) {
      return <div />;
    }

    if (Object.keys(announcements).length === 0) {
      return (
        <div className={classes.emptyAnnouncements}>
          <img
            className={classes.icon}
            src={AnnouncementsIcon}
            alt="list icon"
          />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        {Map(announcements, (announcement, key) => {
          editorID = editorID + 1;
          return (
            <div key={key}>
              <Announcement
                announcementID={key}
                user={workspaceMembers[announcement.createdBy]} // get user object
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
  },
  icon: {
    marginTop: 20,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 200
  },
  emptyAnnouncements: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});
export default withStyles(styles)(AnnouncementList);
