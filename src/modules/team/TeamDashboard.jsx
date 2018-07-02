import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FireIcon from "../../static/teamfire.svg";
import EditIcon from "@material-ui/icons/Edit";

import ModuleHeader from "common/ModuleHeader";
import QuillEditor from "common/QuillEditor";
import Dialog from "common/Dialog";

import TeamMembers from "./TeamMembers";
import TeamCard from "./TeamCard";

class TeamDashboard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selectedTeam: PropTypes.string.isRequired,
    teams: PropTypes.object.isRequired
  };

  state = {
    openAnnouncementDialog: false,
    announcementContent: {}
  };

  handleClose = () => {
    this.setState({ openAnnouncementDialog: false, announcementContent: {} });
  };

  handleOpenAnnouncements = () => {
    this.setState({ openAnnouncementDialog: true });
  };

  handleBlur = quillContent => {
    this.setState({ announcementContent: quillContent });
  };

  handleAnnouncementConfirm = () => {
    const { actions, selectedTeam } = this.props;
    const { announcementContent } = this.state;
    actions.createAnnouncement(announcementContent, selectedTeam);
    this.handleClose();
  };

  render() {
    const { classes, selectedTeam, teams } = this.props;
    const { openAnnouncementDialog, announcementContent } = this.state;

    const team = teams[selectedTeam];
    return (
      <div className={classes.root}>
        <ModuleHeader>
          <Typography variant="headline" className={classes.header}>
            <img src={FireIcon} className={classes.icon} alt="team icon" />
            {team.name}
          </Typography>
        </ModuleHeader>
        <div className={classes.column}>
          <TeamCard
            title={"Team Members"}
            background={`linear-gradient(to right, #29b6f6, #796eff)`}
          >
            <TeamMembers />
          </TeamCard>
          <TeamCard
            title={"Announcements"}
            background={`linear-gradient(to left, #6fe5c9, #00bcd4)`}
            floatingIcon={<EditIcon />}
            floatingAction={this.handleOpenAnnouncements}
            showFloating={true}
          >
            <Dialog
              handleAction={this.handleAnnouncementConfirm}
              open={openAnnouncementDialog}
              handleClose={this.handleClose}
              titleName="Create an announcement"
              actionButtonName="Create"
              color="linear-gradient(to left, #6fe5c9, #00bcd4)"
              helperText="Write down content that you want your whole team to see!"
            >
              <QuillEditor
                helperText=""
                handleBlur={this.handleBlur}
                value={announcementContent}
              />
            </Dialog>
          </TeamCard>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: 500,
    display: "flex",
    flexDirection: "column"
  },
  row: {
    paddingTop: 5,
    height: "50%",
    display: "flex"
  },
  column: {
    display: "flex",
    height: "100%",
    width: "100%"
  },
  header: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    filter: "invert(81%)", // turns white to #303030
    marginRight: 8
  }
});

function mapStateToProps(state) {
  return {
    selectedTeam: state.team.selectedTeam,
    teams: state.team.teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TeamDashboard));
