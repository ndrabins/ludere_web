import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import QuillEditor from "common/QuillEditor";
import Paper from "@material-ui/core/Paper";
import Dialog from "common/Dialog";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ReadOnlyQuill from "common/ReadOnlyQuill";

class Announcement extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    announcementID: PropTypes.string.isRequired
  };

  state = {
    anchorEl: null,
    isEditingAnnouncement: false,
    isDeletingAnnouncement: false,
    announcementContent: this.props.data.content
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseDialog = () => {
    this.setState({
      isEditingAnnouncement: false,
      isDeletingAnnouncement: false
    });
  };

  handleMenuClick = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAnnouncementDeleteConfirmation = () => {
    const { actions, announcementID } = this.props;
    actions.deleteAnnouncement(announcementID);
    this.handleCloseDialog();
  };

  handleAnnouncementEditConfirm = () => {
    const { actions, announcementID } = this.props;
    const { announcementContent } = this.state;

    actions.updatedAnnouncement(announcementID, {
      content: { ...announcementContent, edited: true }
    });
    this.handleCloseDialog();
  };

  handleUpdateAnnouncementOpen = () => {
    this.setState({ isEditingAnnouncement: true });
    this.handleClose();
  };

  handleAnnouncementDeleteOpen = () => {
    this.setState({ isDeletingAnnouncement: true });
    this.handleClose();
  };

  handleBlur = quillContent => {
    this.setState({ announcementContent: quillContent });
  };

  render() {
    const { classes, data, editorID, user } = this.props;
    const {
      anchorEl,
      isEditingAnnouncement,
      isDeletingAnnouncement,
      announcementContent
    } = this.state;

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
          <div className={classes.accessory}>
            <Typography variant="caption" className={classes.timestamp}>
              {timestamp}
            </Typography>

            <MoreVertIcon
              className={classes.icon}
              aria-owns={anchorEl ? "simple-menu" : null}
              aria-haspopup="true"
              onClick={ev => this.handleMenuClick(ev)}
            />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <MenuItem onClick={this.handleUpdateAnnouncementOpen}>
                <ListItemIcon className={classes.icon}>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Announcement" />
              </MenuItem>
              <MenuItem onClick={this.handleAnnouncementDeleteOpen}>
                <ListItemIcon className={classes.icon}>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Announcement" />
              </MenuItem>
            </Popover>
            <Dialog
              handleAction={this.handleAnnouncementEditConfirm}
              open={isEditingAnnouncement}
              handleClose={this.handleCloseDialog}
              titleName="Edit an announcement"
              actionButtonName="Submit"
              color="linear-gradient(to left, #6fe5c9, #00bcd4)"
              helperText="Write down content that you want your whole team to see!"
            >
              <QuillEditor
                helperText=""
                handleBlur={this.handleBlur}
                value={announcementContent}
              />
            </Dialog>
            <Dialog
              handleAction={this.handleAnnouncementDeleteConfirmation}
              open={isDeletingAnnouncement}
              handleClose={this.handleCloseDialog}
              titleName="Delete an announcement"
              actionButtonName="Delete"
              color="rgb(229, 115, 115)"
              helperText="This will permanately delete your announcement"
            >
              <Paper className={classes.paperMessage} elevation={4}>
                <ReadOnlyQuill
                  value={data.content}
                  editorName={editorName + "delete"} // the +"delete" has to be done to instantiate another quilljs
                />
              </Paper>
            </Dialog>
          </div>
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
  },
  accessory: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center"
  },
  icon: {
    color: "#b9bbbe",
    "&:hover": {
      color: "#6f6f6f",
      cursor: "pointer"
    }
  },
  paperMessage: {
    padding: 12,
    display: "flex"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Announcement));
