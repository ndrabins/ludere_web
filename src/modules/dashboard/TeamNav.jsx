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
import PeopleIcon from "@material-ui/icons/PeopleOutline";
import Tooltip from "@material-ui/core/Tooltip";

import AddTeamButton from "./AddTeamButton";

class TeamNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indicatorHeight: 50
    };
  }

  handleTeamSelect(key) {
    // this.setState({indicatorHeight: this.state.indicatorHeight * 2});
    this.props.history.push("/team/");
    this.props.actions.selectTeam(key);
  }

  handleCommunitySelect() {
    this.props.history.push("/community/");
    this.props.actions.selectTeam(null);
  }

  renderTeams() {
    const { location, classes } = this.props;
    if (!this.props.teams) {
      return;
    }

    let focusTeam = location.pathname.includes("team");
    let index = 0;

    let teams = Map(this.props.teams, (team, key) => {
      let selectIndicatorStyle = focusTeam && this.props.selectedTeam === key;
      index++;
      return (
        <div key={key} className={classes.teamButtonContainer}>
          <span
            style={
              selectIndicatorStyle
                ? {
                    ...styles.selectIndicator,
                    background: GradientArray[index % 4]
                  }
                : {
                    ...styles.notSelected,
                    background: GradientArray[index % 4]
                  }
            }
          />
          <Tooltip
            id="tooltip-right-start"
            title={team.name}
            placement="right"
            className={classes.toolTipContainer}
          >
            <Button
              variant="fab"
              style={{
                ...styles.teamButton,
                background: GradientArray[index % 4]
              }}
              onClick={() => this.handleTeamSelect(key)}
            >
              <div className={classes.teamAbbreviation}>
                {team.name.slice(0, 2)}
              </div>
            </Button>
          </Tooltip>
        </div>
      );
    });
    return teams;
  }

  render() {
    const { location, classes } = this.props;
    let focusCommunity = location.pathname.includes("community");

    return (
      <div className={classes.containerWrapper}>
        <div className={classes.container}>
          <div className={classes.teamButtonContainer}>
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
          <div className={classes.divider} />
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
    backgroundColor: "#0000"
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    height: 2,
    width: "34px",
    backgroundColor: "#C3C3C3"
  },
  container: {
    display: "flex",
    width: 60,
    backgroundColor: "#2a2a2a",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "0 5.5px 5px 0 rgba(0, 0, 0, 0.24), 0 9px 18px 0 rgba(0, 0, 0, 0.18)",
    height: "100%",
    paddingTop: 5
  },
  communityButton: {
    color: "#FFF",
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`,
    width: 36,
    height: 36
  },
  teamButton: {
    width: 36,
    height: 36
  },
  notSelected: {
    width: 0,
    position: "absolute",
    height: 38,
    backgroundColor: "white",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    transition: "width .25s linear",
    left: 0
  },
  selectIndicator: {
    position: "absolute",
    width: 7,
    height: 38,
    backgroundColor: "white",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    transition: "width .25s linear",
    left: 0
  },
  teamButtonContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    minHeight: 38,
    margin: "6px 0px 6px 0px"
  },
  teamAbbreviation: {
    fontSize: 14,
    color: "white"
  },
  toolTipContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withRouter(TeamNav))
);
