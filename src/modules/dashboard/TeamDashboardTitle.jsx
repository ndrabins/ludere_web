import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "actions";

import fireIcon from "../../static/teamfire.svg";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class TeamDashboardTitle extends Component {
  render() {
    const { classes, location, teams, selectedTeam, history } = this.props;
    let onTeamPage = location.pathname === "/team/";

    console.log(history);
    console.log(location);

    const myTeam = teams[selectedTeam];

    return (
      <div>
        <Link
          to="/team/"
          className={onTeamPage ? classes.baseFocused : classes.baseWithHover}
        >
          <img src={fireIcon} alt="fireIcon" />
          <div className={classes.titleText}> {myTeam.name} Dashboard </div>
        </Link>
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
    wordWrap: "break-word"
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
    "&:hover": {
      transition: "background-color .25s ease-out",
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
    transition: "background-color .25s ease-out",
    "&:hover": {
      transition: "background-color .25s ease-out",
      backgroundColor: "#424242",
      cursor: "pointer"
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
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(TeamDashboardTitle)
  )
);
