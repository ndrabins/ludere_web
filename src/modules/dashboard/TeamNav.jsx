import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
// import ColorArray from "../../utility/constants/colorsArray";
import GradientArray from "../../utility/constants/gradientArray";

import { withRouter } from "react-router";
import Map from "lodash/map";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import AddTeamButton from "./AddTeamButton";

class TeamNav extends Component {
  handleTeamSelect(teamID) {
    const { actions, history } = this.props;
    history.push("/team/");
    actions.readNotification(teamID);
    actions.selectTeam(teamID);
  }

  handleCommunitySelect() {
    const { actions, history } = this.props;

    history.push("/community/");
    actions.selectTeam(null);
  }

  isTeamNotification(teamID) {
    const { notifications, selectedTeam } = this.props;

    if (notifications === undefined || notifications[teamID] === undefined) {
      return false;
    }

    if (notifications[teamID].showNotification && teamID !== selectedTeam) {
      return true;
    }
    return false;
  }

  renderTeams() {
    const { classes } = this.props;
    if (!this.props.teams) {
      return;
    }

    let index = 0;

    let teams = Map(this.props.teams, (team, teamID) => {
      let selectIndicatorStyle = this.props.selectedTeam === teamID;
      index++;
      return (
        <div key={teamID} className={classes.teamButtonContainer}>
          <span
            style={
              selectIndicatorStyle
                ? {
                    ...styles.selectIndicator,
                    background: GradientArray[index % 4],
                  }
                : {
                    ...styles.notSelected,
                    background: GradientArray[index % 4],
                  }
            }
          />
          <Tooltip id="tooltip-right-start" title={team.name} placement="right">
            <Button
              variant="fab"
              style={{
                ...styles.teamButton,
                background: GradientArray[index % 4],
              }}
              onClick={() => this.handleTeamSelect(teamID)}
            >
              <div className={classes.teamAbbreviation}>
                {team.name.slice(0, 3)}
              </div>
              {this.isTeamNotification(teamID) && (
                <div className={classes.teamNotification} />
              )}
            </Button>
          </Tooltip>
        </div>
      );
    });
    return teams;
  }

  render() {
    const { classes } = this.props;
    // let focusCommunity = location.pathname.includes("community");

    return (
      <div className={classes.containerWrapper}>
        <div className={classes.container}>
          {/* <div className={classes.teamButtonContainer}>
            <span
              style={
                focusCommunity
                  ? {
                      ...styles.selectIndicator,
                      background: `linear-gradient(to left, #6fe5c9, #00bcd4)`
                    }
                  : {
                      ...styles.notSelected,
                      background: `linear-gradient(to left, #6fe5c9, #00bcd4)`
                    }
              }
            />
            <Tooltip
              id="tooltip-right-start"
              title="Community"
              placement="right"
              className={classes.toolTipContainer}
            >
              <Button
                variant="fab"
                className={classes.communityButton}
                onClick={() => this.handleCommunitySelect()}
              >
                <PeopleIcon />
              </Button>
            </Tooltip>
          </div>
          <div className={classes.divider} /> */}
          {this.renderTeams()}
          <AddTeamButton />
        </div>
      </div>
    );
  }
}

const styles = {
  containerWrapper: {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    minWidth: 400,
    width: 400, //the width and margin are like this to 1. Hide the scroll bar 2. Allow the tooltips to have room to show
    marginRight: -340,
    backgroundColor: "#2a2a2a",
    boxShadow:
      "0 5.5px 5px 0 rgba(0, 0, 0, 0.24), 0 9px 18px 0 rgba(0, 0, 0, 0.18)",
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    height: 2,
    width: "34px",
    backgroundColor: "#C3C3C3",
  },
  container: {
    display: "flex",
    width: 60,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    paddingTop: 5,
  },
  communityButton: {
    color: "#FFF",
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`,
    width: 36,
    height: 36,
  },
  teamButton: {
    position: "relative",
    width: 36,
    height: 36,
  },
  teamNotification: {
    width: 10,
    height: 10,
    position: "absolute",
    right: 0,
    bottom: 0,
    borderRadius: 5,
    background: "#FFF",
  },
  notSelected: {
    width: 0,
    position: "absolute",
    height: 38,
    backgroundColor: "white",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    transition: "width .25s linear",
    left: 0,
  },
  selectIndicator: {
    position: "absolute",
    width: 7,
    height: 38,
    backgroundColor: "white",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    transition: "width .25s linear",
    left: 0,
  },
  teamButtonContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 38,
    margin: "6px 0px 6px 0px",
  },
  teamAbbreviation: {
    fontSize: 14,
    color: "white",
  },
};

function mapStateToProps(state) {
  return {
    teams: state.team.teams,
    selectedTeam: state.team.selectedTeam,
    notifications: state.userData.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(TeamNav)));
