import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "actions";

import fireIcon from "../../static/teamfire.svg";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import Dialog from "common/Dialog";
import LudereInput from "common/LudereInput";
import SectionDivider from "common/SectionDivider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class TeamDashboardTitle extends Component {
  state = {
    open: false,
    teamName: this.props.teams[this.props.selectedTeam].name,
    teamNameToDelete: ""
  };

  handleSaveSettings = () => {
    const { actions } = this.props;
    const { teamName } = this.state;

    actions.updateTeam({ name: teamName });

    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      open: false,
      teamName: this.props.teams[this.props.selectedTeam].name
    });
  };

  handleOpen = event => {
    this.setState({ open: true });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDeleteTeam = () => {
    console.log("deleting team");
  };

  render() {
    const { classes, location, teams, selectedTeam } = this.props;
    const { open, teamName, teamNameToDelete } = this.state;

    let onTeamPage = location.pathname === "/team/";

    const myTeam = teams[selectedTeam];

    if (myTeam === undefined) {
      return <div />;
    }

    return (
      <div>
        <Typography
          className={onTeamPage ? classes.baseFocused : classes.baseWithHover}
          component={Link}
          to="/team/"
        >
          <img src={fireIcon} alt="fireIcon" />
          <div className={classes.titleText}> {myTeam.name} Dashboard </div>
          <SettingsIcon
            onClick={event => this.handleOpen(event)}
            className={classes.settingsIcon}
          />
          <Dialog
            handleAction={this.handleSaveSettings}
            open={open}
            handleClose={this.handleClose}
            titleName="Team Settings"
            actionButtonName="Save"
            color="linear-gradient(to right, rgb(41, 182, 246), rgb(121, 110, 255))"
            helperText="All settings related to team."
          >
            <div className={classes.settingsContainer}>
              <LudereInput
                label="Team Name"
                value={teamName}
                handleChange={this.handleChange("teamName")}
                helperText=""
              />
              <SectionDivider content={"Danger"} />
              <div className={classes.deleteContainer}>
                <Typography style={{ marginBottom: 16 }}>
                  <b style={{ color: "rgb(229, 115, 115)" }}>Warning</b>: This
                  is irreversible and will delete all data from team.
                </Typography>
                <LudereInput
                  autoFocus={false}
                  label="Type name of team to confirm delete"
                  value={teamNameToDelete}
                  handleChange={this.handleChange("teamNameToDelete")}
                  helperText=""
                />
                <Button
                  className={classes.deleteButton}
                  variant="outlined"
                  onClick={this.handleDeleteTeam}
                  disabled={myTeam.name !== teamNameToDelete} // only allow them to delete if names match.
                >
                  Delete Team
                </Button>
              </div>
            </div>
          </Dialog>
        </Typography>
      </div>
    );
  }
}

const styles = {
  titleText: {
    marginLeft: 14,
    display: "flex",
    alignSelf: "center",
    wordBreak: "break-word",
    wordWrap: "break-word",
    flex: 1
  },
  baseWithHover: {
    textDecoration: "none",
    color: "#B9BBBE",
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 24,
    borderRadius: 5,
    margin: "1px 8px",
    alignItems: "center",
    transition: "background-color .25s ease-out",
    "&:hover": {
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
  baseFocused: {
    textDecoration: "none",
    color: "#FFF",
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 24,
    borderRadius: 5,
    margin: "1px 8px",
    backgroundColor: "#616161",
    alignItems: "center",
    transition: "background-color .25s ease-out",
    "&:hover": {
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
  settingsIcon: {
    fontSize: 18,
    color: "#6f6f6f",
    "&:hover": {
      color: "#b9bbbe",
      cursor: "pointer"
    }
  },
  settingsContainer: {
    minWidth: 300
  },
  deleteContainer: {
    marginTop: 8
  },
  deleteButton: {
    color: "rgb(229, 115, 115)",
    marginTop: 8,
    transition: "background-color .25s ease-out, color .25s ease-out",
    "&:hover": {
      color: "white",
      backgroundColor: "rgb(229, 115, 115)"
    }
  }
};

function mapStateToProps(state) {
  return {
    teams: state.team.teams,
    selectedTeam: state.team.selectedTeam
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(TeamDashboardTitle))
);
