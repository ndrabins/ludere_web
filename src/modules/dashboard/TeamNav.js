import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import Avatar from "material-ui/Avatar";
import PeopleIcon from "material-ui-icons/PeopleOutline";
import Tooltip from "material-ui/Tooltip";

import AddTeamButton from "./AddTeamButton";

class TeamNav extends Component {
  renderTeams() {
    if(!this.props.teams){
      return;
    }
    console.log("our teams are:", this.props.teams);
    let teams = this.props.teams.map((team, index) => {
        return (
          <Button key={index} fab style={styles.teamButton}>
            <Avatar style={styles.avatar}>H</Avatar>
          </Button>
        )
    });
    return teams;
  }

  render() {
    return (
      <div style={styles.container}>
        <Tooltip id="tooltip-right-start" title="Community" placement="right">
          <Button fab style={styles.communityButton}>
            <PeopleIcon />
          </Button>
        </Tooltip>
        {this.renderTeams()}
        <AddTeamButton />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    width: 58,
    backgroundColor: "#000000",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 12
  },
  communityButton: {
    width: 36,
    height: 36,
    margin: "8px 0px 8px 0px",
    color: "#FFF",
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`
  },
  teamButton: {
    width: 36,
    height: 36,
    margin: "8px 0px 8px 0px"
  },

  avatar: {
    width: 36,
    height: 36
  }
};

function mapStateToProps(state) {
  return {
    teams: state.team.teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamNav);
